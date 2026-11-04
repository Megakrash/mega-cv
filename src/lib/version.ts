import pkg from '../../package.json'

/**
 * Site version shown in the footer. package.json is the single source of
 * truth: the /release skill bumps it, and release.yml tags main with it.
 */
export const APP_VERSION = `v${pkg.version}`

/** GitHub release of the deployed version (created by release.yml on main). */
export const RELEASE_URL = `https://github.com/Megakrash/mega-cv/releases/tag/${APP_VERSION}`
