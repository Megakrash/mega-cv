/** Site locales, in the order the language switcher shows them. */
export const LANGS = ['fr', 'en'] as const

export type Lang = (typeof LANGS)[number]

/** Path of one page in each locale: the language switch and hreflang links. */
export type PagePaths = Readonly<Record<Lang, string>>

/**
 * Home page path of each locale (French is the default, unprefixed). Keep the
 * locales in sync with the `i18n` block of astro.config.mjs.
 */
export const HOME_PATHS = {
  fr: '/',
  en: '/en/',
} as const satisfies PagePaths

/** The mega-series project page (src/pages/projets/ and src/pages/en/projects/). */
export const MEGA_SERIES_PATHS = {
  fr: '/projets/mega-series/',
  en: '/en/projects/mega-series/',
} as const satisfies PagePaths

/**
 * Sections of the home page, in page order (this order numbers them): the
 * proof (experience, projects) before the list of skills.
 */
export const SECTION_KEYS = [
  'about',
  'experience',
  'projects',
  'skills',
  'beforeCode',
  'contact',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

interface UiStrings {
  metaTitle: string
  metaDescription: string
  /** Text alternative of the home page's link preview image. */
  previewAlt: string
  skipToContent: string
  /** Anchor id (localized) and title of each home page section. */
  sections: Record<SectionKey, { id: string; label: string }>
  homeLabel: string
  navLabel: string
  menuLabel: string
  themeToggleLabel: string
  /** Read after the code of the other language (`EN`) in the language switch. */
  switchLanguage: string
  /** Description of the links that open in a new tab. */
  newTab: string
  photoAlt: string
  ctaContact: string
  /** Hero link to the mega-series page. */
  ctaProject: string
  versionLabel: string
  /** End of a period still going on: `sept. 2024 – aujourd’hui`. */
  present: string
  /** Command and comment of the hobbies terminal in the About section. */
  hobbiesCommand: string
  hobbiesComment: string
  /** Accessible names of the tag lists. */
  stackLabel: string
  strengthsLabel: string
  highlightsTitle: string
  educationTitle: string
  associationsTitle: string
  inProduction: string
  /** Link from a project card to the project page, and back. */
  projectDetails: string
  backToProjects: string
  contactIntro: string
  emailReveal: string
  emailCopy: string
  emailCopied: string
  emailCopyFailed: string
  /** The 404 page: its terminal shows a failed `cd`. */
  notFound: {
    title: string
    text: string
    command: string
    error: string
    home: string
    project: string
  }
  /** Download buttons of the CV (PDF) and section titles of the printed CV. */
  cv: {
    download: string
    /** Accessible name of the compact header link. */
    downloadLabel: string
    experience: string
    project: string
    beforeCode: string
    hobbies: string
    /** What the hobbies have in common, before their list. */
    hobbiesIntro: string
  }
}

export const UI = {
  fr: {
    metaTitle: 'Jonathan Scattolini · Ingénieur Full Stack',
    metaDescription:
      'Jonathan Scattolini, ingénieur full stack\u00a0: développement agentique, CI/CD et qualité logicielle.',
    previewAlt:
      'Jonathan Scattolini, ingénieur full stack\u00a0: développement agentique, CI/CD et qualité logicielle. Nantes, full remote ou hybride.',
    skipToContent: 'Aller au contenu',
    sections: {
      about: { id: 'a-propos', label: 'À propos' },
      skills: { id: 'competences', label: 'Compétences' },
      experience: { id: 'parcours', label: 'Parcours' },
      beforeCode: { id: 'avant-le-code', label: 'Avant le code' },
      projects: { id: 'projets', label: 'Projets' },
      contact: { id: 'contact', label: 'Contact' },
    },
    homeLabel: 'Jonathan Scattolini, accueil',
    navLabel: 'Sections',
    menuLabel: 'Menu',
    themeToggleLabel: 'Basculer entre thème clair et thème sombre',
    switchLanguage: 'Read in English',
    newTab: 'S’ouvre dans un nouvel onglet',
    photoAlt: 'Portrait de Jonathan Scattolini',
    ctaContact: 'Me contacter',
    ctaProject: 'Voir mega-series',
    versionLabel: 'Version du site',
    present: 'aujourd’hui',
    hobbiesCommand: 'ls ~/loisirs',
    hobbiesComment: '# de l’automatisation, même pour jouer',
    stackLabel: 'Technologies',
    strengthsLabel: 'Atouts',
    highlightsTitle: 'Réalisations',
    educationTitle: 'Formation',
    associationsTitle: 'Engagement associatif',
    inProduction: 'En production',
    projectDetails: 'Voir le projet en détail',
    backToProjects: 'Retour aux projets',
    contactIntro:
      'Un poste, un projet ou simplement une question\u202f? Le plus simple est d’écrire un e-mail ou un message sur LinkedIn.',
    emailReveal: 'Afficher l’adresse e-mail',
    emailCopy: 'Copier',
    emailCopied: 'Adresse copiée',
    emailCopyFailed: 'Copie impossible\u00a0: l’adresse reste sélectionnable',
    notFound: {
      title: 'Page introuvable',
      text: 'Cette page n’existe pas, ou n’existe plus.',
      command: 'cd ~/cette-page',
      error: 'cd: aucun fichier ou dossier de ce type: ~/cette-page',
      home: 'Retour à l’accueil',
      project: 'Voir le projet mega-series',
    },
    cv: {
      download: 'Télécharger le CV',
      downloadLabel: 'Télécharger le CV (PDF)',
      experience: 'Expérience professionnelle',
      project: 'Projets personnels',
      beforeCode: 'Expérience avant le code',
      hobbies: 'Loisirs',
      hobbiesIntro: 'Jeux de logique et d’automatisation',
    },
  },
  en: {
    metaTitle: 'Jonathan Scattolini · Full Stack Engineer',
    metaDescription:
      'Jonathan Scattolini, full stack engineer: agentic development, CI/CD and software quality.',
    previewAlt:
      'Jonathan Scattolini, full stack engineer: agentic development, CI/CD and software quality. Nantes, full remote or hybrid.',
    skipToContent: 'Skip to content',
    sections: {
      about: { id: 'about', label: 'About' },
      skills: { id: 'skills', label: 'Skills' },
      experience: { id: 'experience', label: 'Experience' },
      beforeCode: { id: 'before-code', label: 'Before code' },
      projects: { id: 'projects', label: 'Projects' },
      contact: { id: 'contact', label: 'Contact' },
    },
    homeLabel: 'Jonathan Scattolini, home',
    navLabel: 'Sections',
    menuLabel: 'Menu',
    themeToggleLabel: 'Switch between light and dark theme',
    switchLanguage: 'Lire en français',
    newTab: 'Opens in a new tab',
    photoAlt: 'Portrait of Jonathan Scattolini',
    ctaContact: 'Get in touch',
    ctaProject: 'See mega-series',
    versionLabel: 'Site version',
    present: 'present',
    hobbiesCommand: 'ls ~/hobbies',
    hobbiesComment: '# automation, even at play',
    stackLabel: 'Technologies',
    strengthsLabel: 'Strengths',
    highlightsTitle: 'Highlights',
    educationTitle: 'Education',
    associationsTitle: 'Volunteering',
    inProduction: 'In production',
    projectDetails: 'View project details',
    backToProjects: 'Back to projects',
    contactIntro:
      'A role, a project or just a question? Email or a LinkedIn message is the easiest way to reach me.',
    emailReveal: 'Show email address',
    emailCopy: 'Copy',
    emailCopied: 'Address copied',
    emailCopyFailed: 'Couldn’t copy: the address can still be selected',
    notFound: {
      title: 'Page not found',
      text: 'This page doesn’t exist, or no longer does.',
      command: 'cd ~/this-page',
      error: 'cd: no such file or directory: ~/this-page',
      home: 'Back to home',
      project: 'See the mega-series project',
    },
    cv: {
      download: 'Download CV',
      downloadLabel: 'Download CV (PDF)',
      experience: 'Professional experience',
      project: 'Personal projects',
      beforeCode: 'Experience before code',
      hobbies: 'Hobbies',
      hobbiesIntro: 'Logic and automation games',
    },
  },
} as const satisfies Record<Lang, UiStrings>

/**
 * Id of the hidden "opens in a new tab" text (BaseLayout) that links to other
 * sites point to with aria-describedby.
 */
export const NEW_TAB_HINT_ID = 'new-tab-hint'

/**
 * Link to a home page section. It carries the page path so that it also works
 * from any other page of the site.
 */
export function sectionHref(lang: Lang, key: SectionKey): string {
  return `${HOME_PATHS[lang]}#${UI[lang].sections[key].id}`
}
