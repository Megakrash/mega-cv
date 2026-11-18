/*
 * Prints the CV of each locale to PDF with the local Chrome, into public/cv/.
 *
 *   pnpm cv            regenerates the PDFs whose content changed
 *   pnpm cv --force    regenerates them all
 *   pnpm cv:check      fails when a PDF is missing or out of date (CI, /release)
 *
 * The print page (src/pages/cv-print/[lang].astro) only exists in an
 * `astro build --mode cv-print` build, made here in a temporary folder and never
 * served: it is the only HTML that holds the e-mail address. Each PDF records the
 * SHA-256 of the HTML it was printed from. Asset names in that HTML are content
 * hashes, so the hash covers the CV's text and its look; checking it needs no
 * Chrome.
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
import { PDFDict, PDFDocument, PDFHexString, PDFName, PDFString } from 'pdf-lib'

import { LANGS, type Lang } from '../src/i18n/ui.ts'
import { CV_PDF_PATHS, CV_PRINT_MODE, cvMetadata, cvPrintPath } from '../src/lib/cv.ts'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CHROME = process.env.CHROME_PATH ?? 'google-chrome'
/** Custom entry of the PDF document information: hash of the printed HTML. */
const SOURCE_HASH = PDFName.of('SourceHash')

const execFileAsync = promisify(execFile)

const pdfFile = (lang: Lang) => path.join(ROOT, 'public', CV_PDF_PATHS[lang])

/** The document information dictionary (Title, Author…), if the PDF has one. */
function infoDict(pdf: PDFDocument): PDFDict | undefined {
  const info = pdf.context.lookup(pdf.context.trailerInfo.Info)
  return info instanceof PDFDict ? info : undefined
}

/** The hash a committed PDF was printed from, if the PDF exists. */
async function storedHash(file: string): Promise<string | undefined> {
  const bytes = await readFile(file).catch(() => undefined)
  if (!bytes) return undefined
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false })
  const value = infoDict(pdf)?.lookup(SOURCE_HASH)
  return value instanceof PDFString || value instanceof PDFHexString
    ? value.decodeText()
    : undefined
}

/** Prints a page to PDF with headless Chrome, in a throwaway profile. */
async function print(url: string, output: string, profile: string): Promise<void> {
  await execFileAsync(
    CHROME,
    [
      '--headless',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${profile}`,
      '--no-pdf-header-footer',
      `--print-to-pdf=${output}`,
      url,
    ],
    { timeout: 60_000 }
  )
}

/** Fills the metadata of a printed CV, checks it is one page, writes it to public/. */
async function finish(printed: string, lang: Lang, hash: string): Promise<void> {
  const pdf = await PDFDocument.load(await readFile(printed), { updateMetadata: false })
  const pages = pdf.getPageCount()
  if (pages !== 1) {
    throw new Error(`The ${lang} CV takes ${pages} pages instead of one: tighten or shorten it.`)
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
  infoDict(pdf)?.set(SOURCE_HASH, PDFString.of(hash))

  const file = pdfFile(lang)
  await mkdir(path.dirname(file), { recursive: true })
  // No object streams: a classic cross-reference table, the most widely read.
  await writeFile(file, await pdf.save({ useObjectStreams: false }))
  console.log(`Wrote ${path.relative(ROOT, file)}`)
}

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2))
  const check = args.has('--check')
  const force = args.has('--force')

  // Inside the project: Astro moves build files with rename(), which fails
  // across file systems (the system temp folder is often a tmpfs).
  const cache = path.join(ROOT, 'node_modules', '.cache')
  await mkdir(cache, { recursive: true })
  const tmp = await mkdtemp(path.join(cache, 'cv-'))
  const outDir = path.join(tmp, 'dist')
  try {
    await build({ root: ROOT, mode: CV_PRINT_MODE, outDir, logLevel: 'warn' })

    const hashes = new Map<Lang, string>()
    for (const lang of LANGS) {
      const html = await readFile(path.join(outDir, cvPrintPath(lang), 'index.html'))
      const hash = createHash('sha256').update(html).digest('hex')
      if (force || (await storedHash(pdfFile(lang))) !== hash) hashes.set(lang, hash)
    }

    if (check) {
      if (hashes.size === 0) {
        console.log('CV PDFs are up to date.')
        return
      }
      const files = [...hashes.keys()].map((lang) => `public${CV_PDF_PATHS[lang]}`).join(', ')
      console.error(`Out of date: ${files}. Run \`pnpm cv\` and commit the PDFs.`)
      process.exitCode = 1
      return
    }
    if (hashes.size === 0) {
      console.log('CV PDFs are up to date, nothing to print (--force prints them anyway).')
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
      for (const [lang, hash] of hashes) {
        const printed = path.join(tmp, `${lang}.pdf`)
        await print(
          `http://127.0.0.1:${server.port}${cvPrintPath(lang)}`,
          printed,
          path.join(tmp, 'chrome-profile')
        )
        await finish(printed, lang, hash)
      }
    } finally {
      await server.stop()
    }
  } finally {
    await rm(tmp, { recursive: true, force: true })
  }
}

await main()
