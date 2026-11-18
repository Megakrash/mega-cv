/*
 * Generates the files the site serves but cannot build itself, with the local
 * Chrome: the CV of each locale as a PDF (public/cv/) and the link preview
 * image of each page and locale as a PNG (src/assets/og/).
 *
 *   pnpm cv            regenerates the files whose content changed
 *   pnpm cv --force    regenerates them all
 *   pnpm cv:check      fails when a file is missing or out of date (CI, /release)
 *
 * Their pages (src/pages/cv-print/[lang].astro, src/pages/og/[card].astro) only
 * exist in an `astro build --mode cv-print` build, made here in a temporary
 * folder and never served: the CV page is the only HTML that holds the e-mail
 * address. Each file records the SHA-256 of the HTML it was made from (an entry
 * of the PDF document information, a tEXt chunk of the PNG). Asset names in that
 * HTML are content hashes, so the hash covers the text and the look; checking
 * it needs no Chrome.
 *
 * Chrome: `google-chrome` from the PATH, or the CHROME_PATH environment variable.
 */
import { build, preview } from 'astro'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { crc32 } from 'node:zlib'
import { PDFDict, PDFDocument, PDFHexString, PDFName, PDFString } from 'pdf-lib'

import { LANGS, type Lang } from '../src/i18n/ui.ts'
import { CV_PDF_PATHS, CV_PRINT_MODE, cvMetadata, cvPrintPath } from '../src/lib/cv.ts'
import { OG_CARDS, OG_SIZE, ogCardPath, ogImageFile } from '../src/lib/og.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CHROME = process.env.CHROME_PATH ?? 'google-chrome'
/** Key under which each file stores the hash of its source HTML. */
const SOURCE_HASH = 'SourceHash'

const execFileAsync = promisify(execFile)

/** A file to generate: the page it is made from and how. */
interface Job {
  /** Path in the cv-print build of the page it is made from. */
  page: string
  /** Output file, relative to the project root. */
  file: string
  /** Hash of the HTML the committed file was made from, if it exists. */
  storedHash: () => Promise<string | undefined>
  /** Makes the file from the page at `url`. */
  make: (url: string, tmp: string, hash: string) => Promise<void>
}

/** Runs the local Chrome headless, in a throwaway profile. */
async function chrome(tmp: string, args: string[], url: string): Promise<void> {
  await execFileAsync(
    CHROME,
    [
      '--headless',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${path.join(tmp, 'chrome-profile')}`,
      ...args,
      url,
    ],
    { timeout: 60_000 }
  )
}

async function readIfExists(file: string): Promise<Buffer | undefined> {
  return readFile(path.join(ROOT, file)).catch(() => undefined)
}

async function write(file: string, bytes: Uint8Array): Promise<void> {
  const output = path.join(ROOT, file)
  await mkdir(path.dirname(output), { recursive: true })
  await writeFile(output, bytes)
  console.log(`Wrote ${file}`)
}

// ---- CV (PDF) ----

/** The document information dictionary (Title, Author…), if the PDF has one. */
function infoDict(pdf: PDFDocument): PDFDict | undefined {
  const info = pdf.context.lookup(pdf.context.trailerInfo.Info)
  return info instanceof PDFDict ? info : undefined
}

async function pdfStoredHash(file: string): Promise<string | undefined> {
  const bytes = await readIfExists(file)
  if (!bytes) return undefined
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false })
  const value = infoDict(pdf)?.lookup(PDFName.of(SOURCE_HASH))
  return value instanceof PDFString || value instanceof PDFHexString
    ? value.decodeText()
    : undefined
}

/** Prints the CV, checks it is one page and fills its metadata. */
function cvJob(lang: Lang): Job {
  const file = path.join('public', CV_PDF_PATHS[lang])
  return {
    page: cvPrintPath(lang),
    file,
    storedHash: () => pdfStoredHash(file),
    async make(url, tmp, hash) {
      const printed = path.join(tmp, `cv-${lang}.pdf`)
      await chrome(tmp, ['--no-pdf-header-footer', `--print-to-pdf=${printed}`], url)

      const pdf = await PDFDocument.load(await readFile(printed), { updateMetadata: false })
      const pages = pdf.getPageCount()
      if (pages !== 1) {
        throw new Error(
          `The ${lang} CV takes ${pages} pages instead of one: tighten or shorten it.`
        )
      }

      const metadata = cvMetadata(lang)
      pdf.setTitle(metadata.title, { showInWindowTitleBar: true })
      pdf.setAuthor(metadata.author)
      pdf.setSubject(metadata.subject)
      // pdf-lib joins keywords with spaces, which merges multi-word ones.
      pdf.setKeywords([metadata.keywords.join(', ')])
      pdf.setLanguage(lang)
      pdf.setCreator('mega-cv, pnpm cv (headless Chrome)')
      // The setters above made sure the dictionary exists.
      infoDict(pdf)?.set(PDFName.of(SOURCE_HASH), PDFString.of(hash))

      // No object streams: a classic cross-reference table, the most widely read.
      await write(file, await pdf.save({ useObjectStreams: false }))
    },
  }
}

// ---- Link preview images (PNG) ----

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
/** End of the IHDR chunk, always the first one (13 bytes of data). */
const IHDR_END = PNG_SIGNATURE.length + 8 + 13 + 4

/** The text of the PNG's tEXt chunk with this keyword, if any. */
function pngText(png: Buffer, keyword: string): string | undefined {
  let offset = PNG_SIGNATURE.length
  while (offset + 8 <= png.length) {
    const length = png.readUInt32BE(offset)
    const type = png.toString('latin1', offset + 4, offset + 8)
    if (type === 'tEXt') {
      const data = png.subarray(offset + 8, offset + 8 + length)
      const separator = data.indexOf(0)
      if (data.toString('latin1', 0, separator) === keyword) {
        return data.toString('latin1', separator + 1)
      }
    }
    offset += 12 + length
  }
  return undefined
}

/** A tEXt chunk: length, type, keyword NUL text, CRC of type and data. */
function textChunk(keyword: string, text: string): Buffer {
  const body = Buffer.from(`tEXt${keyword}\0${text}`, 'latin1')
  const chunk = Buffer.alloc(body.length + 8)
  chunk.writeUInt32BE(body.length - 4, 0)
  body.copy(chunk, 4)
  chunk.writeUInt32BE(crc32(body), body.length + 4)
  return chunk
}

/** Screenshots a card at its size and stores its source hash in the PNG. */
function ogJob(card: (typeof OG_CARDS)[number], lang: Lang): Job {
  const file = ogImageFile(card, lang)
  return {
    page: ogCardPath(card, lang),
    file,
    async storedHash() {
      const bytes = await readIfExists(file)
      return bytes && pngText(bytes, SOURCE_HASH)
    },
    async make(url, tmp, hash) {
      const shot = path.join(tmp, `og-${card}-${lang}.png`)
      await chrome(
        tmp,
        [
          '--hide-scrollbars',
          '--force-device-scale-factor=1',
          `--window-size=${OG_SIZE.width},${OG_SIZE.height}`,
          // Lets fonts and images load before the capture.
          '--virtual-time-budget=5000',
          `--screenshot=${shot}`,
        ],
        url
      )

      const png = await readFile(shot)
      if (!png.subarray(0, 8).equals(PNG_SIGNATURE) || png.toString('latin1', 12, 16) !== 'IHDR') {
        throw new Error(`Chrome did not write a PNG for ${file}.`)
      }
      const width = png.readUInt32BE(16)
      const height = png.readUInt32BE(20)
      if (width !== OG_SIZE.width || height !== OG_SIZE.height) {
        throw new Error(
          `${file} is ${width}×${height} instead of ${OG_SIZE.width}×${OG_SIZE.height}.`
        )
      }

      const chunk = textChunk(SOURCE_HASH, hash)
      await write(file, Buffer.concat([png.subarray(0, IHDR_END), chunk, png.subarray(IHDR_END)]))
    },
  }
}

// ---- Main ----

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2))
  const check = args.has('--check')
  const force = args.has('--force')

  const jobs = [
    ...LANGS.map(cvJob),
    ...OG_CARDS.flatMap((card) => LANGS.map((lang) => ogJob(card, lang))),
  ]

  // Inside the project: Astro moves build files with rename(), which fails
  // across file systems (the system temp folder is often a tmpfs).
  const cache = path.join(ROOT, 'node_modules', '.cache')
  await mkdir(cache, { recursive: true })
  const tmp = await mkdtemp(path.join(cache, 'cv-'))
  const outDir = path.join(tmp, 'dist')
  try {
    await build({ root: ROOT, mode: CV_PRINT_MODE, outDir, logLevel: 'warn' })

    const stale = new Map<Job, string>()
    for (const job of jobs) {
      const html = await readFile(path.join(outDir, job.page, 'index.html'))
      const hash = createHash('sha256').update(html).digest('hex')
      if (force || (await job.storedHash()) !== hash) stale.set(job, hash)
    }

    if (check) {
      if (stale.size === 0) {
        console.log('CV PDFs and preview images are up to date.')
        return
      }
      const files = [...stale.keys()].map((job) => job.file).join(', ')
      console.error(`Out of date: ${files}. Run \`pnpm cv\` and commit them.`)
      process.exitCode = 1
      return
    }
    if (stale.size === 0) {
      console.log('CV PDFs and preview images are up to date (--force makes them anyway).')
      return
    }

    const server = await preview({
      root: ROOT,
      mode: CV_PRINT_MODE,
      outDir,
      logLevel: 'warn',
      server: { host: '127.0.0.1' },
    })
    try {
      for (const [job, hash] of stale) {
        await job.make(`http://127.0.0.1:${server.port}${job.page}`, tmp, hash)
      }
    } finally {
      await server.stop()
    }
  } finally {
    await rm(tmp, { recursive: true, force: true })
  }
}

await main()
