/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{ts,tsx,js,jsx,mjs,astro}': (filenames) => {
    const nonIgnoredFiles = filenames.filter(
      (file) =>
        !file.endsWith('.d.ts') &&
        !file.includes('.config.') &&
        !file.includes('.lintstagedrc.') &&
        !file.includes('commitlint.config.')
    )
    if (nonIgnoredFiles.length === 0) return []
    return [
      `eslint --fix --max-warnings=0 ${nonIgnoredFiles.join(' ')}`,
      `prettier --write ${nonIgnoredFiles.join(' ')}`,
    ]
  },
  '*.{json,md,yml,yaml,css}': ['prettier --write'],
}
