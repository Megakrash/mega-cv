import type { Lang } from '../i18n/ui'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jonathanscattolini/'
export const GITHUB_URL = 'https://github.com/Megakrash'

/**
 * Contact address, split so that it is written in one piece neither in this
 * public repository nor in the built HTML: the Contact section assembles it in
 * the browser, on click.
 */
export const EMAIL_PARTS = { user: 'contact', domain: 'jonathan-scattolini.fr' } as const

interface Profile {
  name: string
  jobTitle: string
  tagline: string
  pitch: string
  /** Availability, shown in the hero badge and the whoami.json card. */
  status: string
  /** Kind of position wanted, shown next to the status in the hero badge. */
  lookingFor: string
  location: string
  /** Main areas of work, listed in the whoami.json card. */
  focus: readonly string[]
}

const NAME = 'Jonathan Scattolini'
const LOCATION = 'Nantes, France'

/** Who Jonathan is, in both languages: the content the site and the CV share. */
export const PROFILE = {
  fr: {
    name: NAME,
    jobTitle: 'Ingénieur Full Stack',
    tagline: 'CI/CD, qualité et automatisation pilotées par l’IA',
    pitch:
      'Je conçois des applications web de bout en bout et j’automatise tout ce qui les entoure\u00a0: tests, CI/CD, releases. Avec des agents IA, dans l’éditeur comme dans la chaîne de livraison.',
    status: 'Ouvert aux opportunités',
    lookingFor: 'CDI full remote',
    location: LOCATION,
    focus: ['Automatisation CI/CD', 'Qualité & tests', 'Développement piloté par agents IA'],
  },
  en: {
    name: NAME,
    jobTitle: 'Full Stack Engineer',
    tagline: 'CI/CD, quality & AI-driven automation',
    pitch:
      'I build web applications end to end and automate everything around them: tests, CI/CD, releases. With AI agents, in the editor as well as in the delivery pipeline.',
    status: 'Open to opportunities',
    lookingFor: 'full-remote permanent role',
    location: LOCATION,
    focus: ['CI/CD automation', 'Quality & testing', 'AI agent-driven development'],
  },
} as const satisfies Record<Lang, Profile>

/*
 * The lists below carry both languages in each item: dates, technologies and
 * URLs are written once, and an item cannot exist in one language only.
 */

/** A text in both site languages. */
export type Localized<T = string> = Readonly<Record<Lang, T>>

/** A tag: technology names stay as they are, generic terms are translated. */
type Tag = string | Localized

/** Text of a tag in the given language. */
export function localize(tag: Tag, lang: Lang): string {
  return typeof tag === 'string' ? tag : tag[lang]
}

/** "YYYY-MM", or "YYYY" when the month does not matter. */
export type DateString = `${number}` | `${number}-${number}`

/** A span of time; without `end`, it is still going on. */
export interface Period {
  start: DateString
  end?: DateString
}

interface Role extends Period {
  title: Localized
  /** Kind of contract: permanent, apprenticeship… */
  contract: Localized
  summary: Localized
}

interface Experience {
  company: string
  url: string
  /** What the company does and where the job is done. */
  description: Localized
  /** Positions held in the company, newest first. */
  roles: readonly Role[]
  highlights: readonly Localized[]
  stack: readonly Tag[]
}

interface Education {
  /** When the degree was earned, or how long the training lasted. */
  date: DateString | Period
  title: Localized
  school?: string
  details?: Localized
}

interface SkillGroup {
  title: Localized
  items: readonly Tag[]
}

interface PastPosition extends Period {
  organization: string
  /** What the organization is, when its name does not say it. */
  about?: Localized
  role: Localized
  details?: Localized
}

interface Project {
  name: string
  url: string
  description: Localized
  highlights: readonly Localized[]
  stack: readonly string[]
}

/** About section: the career change and the current role, one item per paragraph. */
export const ABOUT = {
  fr: [
    'Pendant une vingtaine d’années, j’ai dirigé plusieurs projets associatifs puis mes propres entreprises. En 2022, j’ai fait du développement mon métier\u00a0: bootcamp à la Wild Code School, puis une année d’alternance chez Beekast, validée par le titre de Concepteur Développeur d’Applications (RNCP niveau\u00a06).',
    'Chez Beekast, éditeur d’une plateforme SaaS de réunions interactives, je suis aujourd’hui ingénieur transverse. Je développe des fonctionnalités de bout en bout, mais je m’occupe surtout de tout ce qui entoure le code\u00a0: tests unitaires, d’intégration et E2E, CI, environnements temporaires par PR, releases automatisées, et la santé d’un très gros monorepo.',
    'L’IA fait partie de cette chaîne\u00a0: elle traite les bugs remontés par Sentry directement dans GitHub, rédige les checklists de recette des PR et les notes de version. Sur mes projets personnels, comme mega-series, je développe en pilotant des agents IA.',
    'De ma première vie, je garde le goût des responsabilités, l’habitude de gérer une équipe et un budget, et le réflexe de rendre des comptes.',
  ],
  en: [
    'For some twenty years I ran several non-profit projects, then my own companies. In 2022 I made software development my job: a Wild Code School bootcamp, then a one-year apprenticeship at Beekast, completed with a bachelor-level degree in application design and development (French RNCP level 6).',
    'At Beekast, which makes a SaaS platform for interactive meetings, I am now a cross-functional engineer. I build features end to end, but mostly I take care of everything around the code: unit, integration and E2E tests, CI, temporary per-PR environments, automated releases, and the health of a very large monorepo.',
    'AI is part of that pipeline: it handles the bugs reported by Sentry right in GitHub, and writes the QA checklists of pull requests and the release notes. On my own projects, such as mega-series, I build by driving AI agents.',
    'From my first career I keep a taste for responsibility, experience managing a team and a budget, and the habit of being accountable.',
  ],
} as const satisfies Localized<readonly string[]>

/** Logic and automation games, listed by the `ls ~/hobbies` line. */
export const HOBBIES = ['Factorio', 'Satisfactory', 'Shapez 2'] as const

export const SKILLS = [
  {
    title: { fr: 'Front-end', en: 'Front-end' },
    items: [
      'TypeScript',
      'JavaScript',
      'Vue 3',
      'Vue 2',
      'React',
      'React Native',
      'Pinia',
      'Vue Router',
      'Vuetify',
      'Apollo Client',
      'Vite',
      'Astro',
      'single-spa',
      'webpack',
      'HTML',
      'CSS',
      'Sass',
    ],
  },
  {
    title: { fr: 'Back-end', en: 'Back-end' },
    items: [
      'Node.js',
      'NestJS',
      'GraphQL',
      'Apollo Server',
      'GraphQL Codegen',
      'Express',
      'Koa',
      'TypeORM',
      'PostgreSQL',
      'MongoDB',
      'Mongoose',
      'Redis',
      'NATS',
      'BullMQ',
      'REST',
      'microservices',
    ],
  },
  {
    title: { fr: 'Tests & qualité', en: 'Testing & quality' },
    items: [
      'Playwright',
      'Jest',
      'Vitest',
      'Vue Test Utils',
      'ESLint',
      'Prettier',
      'Husky',
      'commitlint',
    ],
  },
  {
    title: { fr: 'CI/CD & DevOps', en: 'CI/CD & DevOps' },
    items: [
      'GitHub Actions',
      'Docker',
      'Docker Compose',
      'nginx',
      'pnpm workspaces',
      'Coolify',
      'AWS',
      'Kubernetes',
      'Helm',
      'ELK',
      'Kibana',
      'Linux',
      'Dependabot',
    ],
  },
  {
    title: { fr: 'IA & automatisation', en: 'AI & automation' },
    items: [
      'Claude Code',
      'Codex',
      'CodeRabbit',
      { fr: 'agents & sous-agents', en: 'agents & subagents' },
      { fr: 'création de skills', en: 'skill authoring' },
      'hooks',
      'MCP',
      { fr: 'Claude en CI', en: 'Claude in CI' },
      'prompt engineering',
    ],
  },
  {
    title: { fr: 'Outils & méthodes', en: 'Tools & practices' },
    items: [
      'Git',
      'GitHub',
      'Jira',
      'Sentry',
      'Slack',
      'Notion',
      { fr: 'revue de code', en: 'code review' },
      'Agile',
      'Conventional Commits',
      'SemVer',
    ],
  },
] as const satisfies readonly SkillGroup[]

export const EXPERIENCES = [
  {
    company: 'Beekast',
    url: 'https://www.beekast.com',
    description: {
      fr: 'Éditeur d’une plateforme SaaS de réunions interactives · full remote',
      en: 'SaaS platform for interactive meetings · full remote',
    },
    roles: [
      {
        title: { fr: 'Ingénieur Full Stack', en: 'Full Stack Engineer' },
        contract: { fr: 'CDI', en: 'Permanent contract' },
        start: '2024-09',
        summary: {
          fr: 'Rôle transverse\u00a0: environ 30\u202f% de développement full stack sur les nouvelles fonctionnalités, le reste sur l’automatisation de la qualité, de la CI et des releases, largement pilotée par l’IA.',
          en: 'Cross-functional role: about 30% full stack development on new features, the rest on automating quality, CI and releases, largely AI-driven.',
        },
      },
      {
        title: { fr: 'Développeur QA & full stack', en: 'QA & Full Stack Developer' },
        contract: { fr: 'Alternance', en: 'Apprenticeship' },
        start: '2023-09',
        end: '2024-09',
        summary: {
          fr: 'Recette des nouvelles fonctionnalités, puis développement full stack, en alternance avec la Wild Code School.',
          en: 'QA on new features, then full stack development, as a work-study student with the Wild Code School.',
        },
      },
    ],
    highlights: [
      {
        fr: 'Migration de Node\u00a020 à Node\u00a024 d’une stack vaste et vieillissante (plusieurs fronts, de nombreuses bibliothèques internes, plus de 35\u00a0microservices)\u00a0: harmonisation ESLint et Prettier, montée de version majeure de presque toutes les dépendances, tests unitaires unifiés sous Jest et TypeScript (plus de 1\u202f500\u00a0tests réécrits), parallélisés et obligatoires en CI.',
        en: 'Migrated a large, aging stack (several front ends, many in-house libraries, 35+ microservices) from Node 20 to Node 24: ESLint and Prettier harmonized, major upgrades of almost every dependency, unit tests unified on Jest and TypeScript (1,500+ tests rewritten), sharded and required in CI.',
      },
      {
        fr: 'Création des tests d’intégration à partir de zéro (plus de 90\u202f% des fichiers front couverts, avec Vitest, et Jest pour les fronts historiques) et de toute la suite E2E Playwright en TypeScript. Elle tourne automatiquement sur l’environnement de test et sur l’environnement temporaire de chaque PR, avec alertes Slack, parallélisée et obligatoire.',
        en: 'Built integration tests from scratch (over 90% of front-end files covered, with Vitest, plus Jest for legacy front ends) and the whole Playwright E2E suite in TypeScript. It runs automatically against the test environment and each PR’s temporary environment, with Slack alerts, sharded and required.',
      },
      {
        fr: 'Processus de release entièrement automatisé en CI\u00a0: releases Jira et GitHub, étiquetage automatique des tickets par périmètre, tag des images prêtes pour la production, note de version rédigée par l’IA.',
        en: 'Fully automated release process in CI: Jira and GitHub releases, automatic ticket tagging by scope, tagging of production-ready images, release notes written by AI.',
      },
      {
        fr: 'L’IA dans la chaîne de livraison\u00a0: bugs Sentry traités directement dans GitHub, checklists de recette générées dans chaque PR.',
        en: 'AI in the delivery pipeline: Sentry bugs handled right in GitHub, QA checklists generated in every PR.',
      },
      {
        fr: 'Garant de l’architecture du monorepo pnpm et de la qualité du code\u202f; pilotage de la refonte des microservices Node.js (Koa, Express) vers un monolithe NestJS aux types générés.',
        en: 'Guardian of the pnpm monorepo architecture and code quality; driving the refactor of the Node.js microservices (Koa, Express) into a NestJS monolith with generated types.',
      },
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'Koa',
      'Express',
      'NestJS',
      'MongoDB',
      'Mongoose',
      'NATS',
      'BullMQ',
      'Vue 3',
      'Vue 2',
      'single-spa',
      'Jest',
      'Vitest',
      'Playwright',
      'GitHub Actions',
      'Docker',
      'Kubernetes',
      'Helm',
      'AWS',
      'Kibana',
      'pnpm',
      'Sentry',
      'Jira',
      { fr: 'IA', en: 'AI' },
    ],
  },
] as const satisfies readonly Experience[]

/** Degrees and training, newest first. */
export const EDUCATION = [
  {
    date: '2024-09',
    title: {
      fr: 'Concepteur Développeur d’Applications',
      en: 'Application Designer and Developer',
    },
    school: 'Wild Code School',
    details: {
      fr: 'Titre RNCP niveau\u00a06 (bac+3/4), obtenu à l’issue de l’alternance chez Beekast.',
      en: 'French RNCP level 6 degree (bachelor’s level), earned at the end of the apprenticeship at Beekast.',
    },
  },
  {
    date: '2023-12',
    title: { fr: 'Développeur Web et Web Mobile', en: 'Web and Mobile Web Developer' },
    school: 'Wild Code School',
    details: {
      fr: 'Titre RNCP niveau\u00a05 (bac+2).',
      en: 'French RNCP level 5 degree (two-year higher education level).',
    },
  },
  {
    date: { start: '2022-09', end: '2023-02' },
    title: { fr: 'Bootcamp développeur web et mobile', en: 'Web and mobile developer bootcamp' },
    school: 'Wild Code School',
    details: {
      fr: 'Cinq mois intensifs, lauréat du hackathon 2022 de l’école.',
      en: 'Five-month intensive program, winner of the school’s 2022 hackathon.',
    },
  },
  {
    date: '2000',
    title: {
      fr: 'Bac STT, gestion et comptabilité',
      en: 'French baccalauréat in management and accounting (STT)',
    },
  },
] as const satisfies readonly Education[]

/** The career before code: some twenty years of responsibility roles. */
export const PAST_CAREER = {
  intro: {
    fr: 'Avant de coder, j’ai passé une vingtaine d’années à diriger\u00a0: des équipes, des budgets, des chantiers, puis mes propres entreprises. Cette première carrière reste un atout\u00a0: on la retrouve dans ma façon de prioriser, d’organiser et de rendre des comptes.',
    en: 'Before coding, I spent some twenty years running things: teams, budgets, building projects, then my own companies. That first career is still an asset: it shows in how I prioritize, organize and stay accountable.',
  },
  strengths: {
    fr: [
      'Management d’équipe',
      'Gestion administrative et comptable',
      'Maîtrise d’ouvrage',
      'Communication et marketing',
      'Entrepreneuriat',
      'Animation de bénévoles',
    ],
    en: [
      'Team management',
      'Administration & accounting',
      'Project ownership',
      'Communication & marketing',
      'Entrepreneurship',
      'Volunteer coordination',
    ],
  },
  /** Newest first. */
  positions: [
    {
      organization: 'ECOPHONE 44 / Nantes Repair',
      start: '2015',
      end: '2020',
      role: { fr: 'Co-gérant associé', en: 'Co-managing partner' },
      details: {
        fr: 'Gestion administrative et comptable, communication et marketing.',
        en: 'Administration and accounting, communication and marketing.',
      },
    },
    {
      organization: 'Radio Prun’',
      about: { fr: 'Radio associative nantaise', en: 'Nantes community radio station' },
      start: '2007',
      end: '2012',
      role: { fr: 'Directeur', en: 'Director' },
      details: {
        fr: 'Direction de la structure, de l’antenne et des programmes\u00a0: 7\u00a0salariés, 200\u00a0bénévoles, ligne éditoriale, stratégie de communication et développement technique.',
        en: 'Ran the organization, the station and its programming: 7 employees, 200 volunteers, editorial line, communication strategy and technical development.',
      },
    },
    {
      organization: 'GRAM',
      about: {
        fr: 'Groupement des radios associatives de la métropole',
        en: 'Nantes community radio group',
      },
      start: '2007',
      end: '2012',
      role: { fr: 'Maître d’ouvrage', en: 'Project owner' },
      details: {
        fr: 'Maison de la radio associative et sites de diffusion FM et numérique\u202f; gestion administrative et comptable.',
        en: 'Community radio house and FM and digital broadcast sites; administration and accounting.',
      },
    },
  ],
  /** Volunteer work, newest first. */
  associations: [
    {
      organization: 'Labo des Savoirs',
      start: '2010',
      end: '2015',
      role: { fr: 'Membre fondateur', en: 'Founding member' },
    },
    {
      organization: 'FRAP',
      about: {
        fr: 'Fédération des radios associatives des Pays de la Loire',
        en: 'Pays de la Loire community radio federation',
      },
      start: '2007',
      end: '2011',
      role: { fr: 'Trésorier', en: 'Treasurer' },
    },
    {
      organization: 'Radio JET FM',
      start: '1995',
      end: '2000',
      role: { fr: 'Bénévole', en: 'Volunteer' },
    },
  ],
} as const satisfies {
  intro: Localized
  strengths: Localized<readonly string[]>
  positions: readonly PastPosition[]
  associations: readonly PastPosition[]
}

export const PROJECTS = [
  {
    name: 'mega-series',
    url: 'https://mega-series.fr',
    description: {
      fr: 'Suivi de séries multi-utilisateur\u00a0: catalogue TMDB, collection, watchlist et suivi épisode par épisode. Conçu et développé seul en pilotant des agents IA, de la base de données à la mise en production.',
      en: 'Multi-user TV series tracker: TMDB catalog, collection, watchlist and episode-by-episode tracking. Designed and built solo by driving AI agents, from the database to production.',
    },
    highlights: [
      {
        fr: 'Application web installable (PWA) et back-office avec double authentification',
        en: 'Installable web app (PWA) and an admin back office with two-factor authentication',
      },
      {
        fr: 'API GraphQL aux types générés de bout en bout',
        en: 'GraphQL API with end-to-end generated types',
      },
      {
        fr: 'Déploiement continu sur VPS, sauvegardes chiffrées quotidiennes',
        en: 'Continuous deployment to a VPS, encrypted daily backups',
      },
    ],
    stack: [
      'NestJS',
      'GraphQL',
      'TypeORM',
      'PostgreSQL',
      'Redis',
      'Vue 3',
      'Vuetify',
      'Apollo Client',
      'PWA',
      'Docker',
      'GitHub Actions',
      'Coolify',
    ],
  },
] as const satisfies readonly Project[]
