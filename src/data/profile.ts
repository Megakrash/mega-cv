// Explicit extension: scripts/cv.ts loads this file with Node, which needs it.
import { MEGA_SERIES_PATHS, type Lang, type PagePaths } from '../i18n/ui.ts'

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
  location: string
  /** How Jonathan works, shown after the location (hero badge, CV header, link preview). */
  workMode: string
  /** The first career in a few words, in the whoami.json card. */
  background: string
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
    tagline: 'Développement agentique · CI/CD · qualité logicielle',
    pitch:
      'Je conçois des applications web de bout en bout et j’industrialise ce qui les entoure\u00a0: tests, CI/CD, releases. Après une vingtaine d’années à diriger des équipes et des entreprises, je pilote aujourd’hui des agents IA de la même façon\u00a0: cadrer, déléguer, vérifier.',
    location: LOCATION,
    workMode: 'full remote ou hybride',
    background: '~20 ans à diriger équipes et entreprises',
    focus: ['Pilotage d’agents IA', 'Automatisation CI/CD', 'Qualité & tests'],
  },
  en: {
    name: NAME,
    jobTitle: 'Full Stack Engineer',
    tagline: 'Agentic development · CI/CD · software quality',
    pitch:
      'I build web applications end to end and industrialize everything around them: tests, CI/CD, releases. After some twenty years leading teams and companies, I now drive AI agents the same way: frame, delegate, verify.',
    location: LOCATION,
    workMode: 'full remote or hybrid',
    background: '~20 years leading teams and companies',
    focus: ['Driving AI agents', 'CI/CD automation', 'Quality & testing'],
  },
} as const satisfies Record<Lang, Profile>

/*
 * The lists below carry both languages in each item: dates, technologies and
 * URLs are written once, and an item cannot exist in one language only.
 */

/** A text in both site languages. */
export type Localized<T = string> = Readonly<Record<Lang, T>>

/**
 * A text that may not need translating: technology names stay as they are,
 * generic terms are translated.
 */
export type Text = string | Localized

/** A text in the given language. */
export function localize(text: Text, lang: Lang): string {
  return typeof text === 'string' ? text : text[lang]
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
  stack: readonly Text[]
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
  items: readonly Text[]
}

interface PastPosition extends Period {
  organization: string
  /** What the organization is (and its size), when its name does not say it. */
  about?: Localized
  role: Localized
  details?: Localized
}

interface Project {
  name: string
  url: string
  /** Text of the link to `url`, when its hostname does not say enough. */
  urlLabel?: Localized
  /** Page presenting the project on this site. */
  page?: PagePaths
  /** Printed on the CV with its heading and description only, to save room. */
  brief?: true
  description: Localized
  highlights: readonly Localized[]
  stack: readonly string[]
}

/** About section: the current role, then the career change, one item per paragraph. */
export const ABOUT = {
  fr: [
    'Je suis ingénieur full stack chez Beekast, éditeur d’une plateforme SaaS de réunions interactives. Mon rôle est transverse\u00a0: je développe des fonctionnalités de bout en bout et je suis responsable de ce qui permet à l’équipe de livrer sereinement, des tests unitaires, d’intégration et E2E à la CI, aux environnements temporaires par PR et aux releases automatisées. Je veille aussi à la santé d’un très gros monorepo et je pilote la refonte de ses microservices en un monolithe NestJS.',
    'L’IA est au cœur de cette chaîne. Sur chaque PR, elle confronte le code aux attentes du ticket et publie une checklist de test pour le développeur. Chaque nuit, un bot de sécurité corrige les vulnérabilités des dépendances et ouvre lui-même les PR. Les bugs remontés par Sentry sont traités directement dans GitHub, et les notes de version s’écrivent seules. Sur mes projets personnels, je développe en pilotant des agents IA\u00a0: mega-series, en production, a été conçu et livré seul en 4,5\u00a0mois, en parallèle de mon CDI à temps plein.',
    'Avant le code, j’ai passé une vingtaine d’années à diriger des projets associatifs, dont une radio de 7\u00a0salariés et 200\u00a0bénévoles, puis mes propres entreprises. En 2022, j’ai fait du développement mon métier\u00a0: bootcamp à la Wild Code School, puis une année d’alternance chez Beekast, validée par le titre de Concepteur Développeur d’Applications (RNCP niveau\u00a06).',
    'Ce parcours est ma force. Piloter des agents IA demande ce que je pratique depuis vingt ans\u00a0: cadrer, déléguer, contrôler, rendre des comptes. Et je connais l’entreprise de l’intérieur\u00a0: les budgets, les clients, les priorités.',
  ],
  en: [
    'I am a full stack engineer at Beekast, which makes a SaaS platform for interactive meetings. My role is cross-functional: I build features end to end and I own what lets the team ship with confidence, from unit, integration and E2E tests to CI, temporary per-PR environments and automated releases. I also look after the health of a very large monorepo and lead the move of its microservices to a NestJS monolith.',
    'AI is at the heart of that pipeline. On every pull request, it checks the code against the ticket’s expectations and posts a testing checklist for the developer. Every night, a security bot fixes dependency vulnerabilities and opens the pull requests itself. Sentry bugs are handled right in GitHub, and release notes write themselves. On my own projects, I build by driving AI agents: mega-series, live in production, was designed and shipped solo in 4.5 months, alongside my full-time job.',
    'Before code, I spent some twenty years running non-profit projects, including a radio station with 7 employees and 200 volunteers, then my own companies. In 2022 I made software development my job: a Wild Code School bootcamp, then a one-year apprenticeship at Beekast, completed with a bachelor-level degree in application design and development (French RNCP level 6).',
    'That background is my strength. Driving AI agents takes what I have practiced for twenty years: framing, delegating, checking, being accountable. And I know a business from the inside: budgets, customers, priorities.',
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
      'Vuetify',
      'Apollo Client',
      'Vite',
      'Astro',
      'single-spa',
      'webpack',
    ],
  },
  {
    title: { fr: 'Back-end', en: 'Back-end' },
    items: [
      'Node.js',
      'NestJS',
      'GraphQL',
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
    items: ['Playwright', 'Jest', 'Vitest', 'Vue Test Utils', 'ESLint', 'Prettier', 'commitlint'],
  },
  {
    title: { fr: 'CI/CD & DevOps', en: 'CI/CD & DevOps' },
    items: [
      'GitHub Actions',
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'Helm',
      'AWS',
      'nginx',
      'pnpm workspaces',
      'Coolify',
      'ELK',
      'Kibana',
      'Linux',
    ],
  },
  {
    title: { fr: 'IA & automatisation', en: 'AI & automation' },
    items: [
      'Claude Code',
      'Codex',
      'CodeRabbit',
      { fr: 'Claude dans GitHub Actions', en: 'Claude in GitHub Actions' },
      { fr: 'orchestration multi-agents', en: 'multi-agent orchestration' },
      { fr: 'création de skills', en: 'skill authoring' },
      'hooks',
      'MCP',
      { fr: 'revue de code généré', en: 'reviewing generated code' },
    ],
  },
  {
    title: { fr: 'Outils & méthodes', en: 'Tools & practices' },
    items: [
      'Git',
      'GitHub',
      'Jira',
      'Sentry',
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
          fr: 'Rôle transverse\u00a0: développement full stack et responsabilité de la chaîne qualité, CI et release de l’équipe, largement automatisée par l’IA.',
          en: 'Cross-functional role: full stack development, and ownership of the team’s quality, CI and release pipeline, largely automated with AI.',
        },
      },
      {
        title: { fr: 'Développeur QA & full stack', en: 'QA & Full Stack Developer' },
        contract: { fr: 'Alternance', en: 'Apprenticeship' },
        start: '2023-09',
        end: '2024-09',
        summary: {
          fr: 'Assurance qualité des nouvelles fonctionnalités, puis développement full stack, en alternance avec la Wild Code School.',
          en: 'Quality assurance on new features, then full stack development, as a work-study student with the Wild Code School.',
        },
      },
    ],
    /** Most telling first: scope and seniority before techniques. */
    highlights: [
      {
        fr: 'Garant de l’architecture du monorepo pnpm et de la qualité du code\u202f; pilotage de la refonte des microservices Node.js (Koa, Express) vers un monolithe NestJS aux types générés.',
        en: 'Guardian of the pnpm monorepo architecture and code quality; leading the refactor of the Node.js microservices (Koa, Express) into a NestJS monolith with generated types.',
      },
      {
        fr: 'Release entièrement automatisée en CI\u00a0: 4 à 6\u00a0releases par mois au lieu de 2, pour une dizaine de minutes de travail au lieu de 5 à 7\u00a0heures par semaine. Versioning, notes de version générées par l’IA, tag des images protégé par des garde-fous (commit manquant, sidecars à reconstruire…), clôture de la version et des tickets.',
        en: 'Fully automated the release process in CI: 4–6 releases a month instead of 2, for about ten minutes of work instead of 5–7 hours a week. Versioning, release notes generated by AI, image tagging behind guardrails (a missing commit, sidecars to rebuild…), closing of the version and its tickets.',
      },
      {
        fr: 'Bot de sécurité piloté par l’IA, lancé chaque nuit\u00a0: il corrige les vulnérabilités des dépendances (montées de version, overrides), teste le code, ouvre les PR, crée les tickets et les passe en «\u00a0In review\u00a0», puis prévient l’équipe sur Slack.',
        en: 'AI-driven security bot, run nightly: it fixes dependency vulnerabilities (version bumps, overrides), tests the code, opens the pull requests, creates the tickets and moves them to “In review”, then notifies the team on Slack.',
      },
      {
        fr: 'L’IA dans chaque PR\u00a0: une checklist de test, construite à partir des attentes du ticket, aide chaque développeur à vérifier son propre code\u202f; les bugs remontés par Sentry sont traités directement dans GitHub.',
        en: 'AI in every pull request: a testing checklist, built from the ticket’s expectations, helps each developer check their own code; Sentry bugs are handled right in GitHub.',
      },
      {
        fr: 'Migration de Node\u00a020 à Node\u00a024 d’une stack vieillissante (plusieurs fronts, bibliothèques internes, plus de 35\u00a0microservices)\u00a0: dépendances mises à jour, ESLint et Prettier harmonisés, plus de 1\u202f500\u00a0tests réécrits sous Jest et TypeScript, obligatoires en CI.',
        en: 'Migrated an aging stack (several front ends, in-house libraries, 35+ microservices) from Node 20 to Node 24: dependencies upgraded, ESLint and Prettier harmonized, 1,500+ tests rewritten on Jest and TypeScript, required in CI.',
      },
      {
        fr: 'Tests d’intégration créés de zéro (plus de 90\u202f% de couverture du code front, Vitest et Jest) et toute la suite E2E Playwright, lancée sur l’environnement temporaire de chaque PR, parallélisée et obligatoire.',
        en: 'Built integration tests from scratch (over 90% front-end code coverage, Vitest and Jest) and the whole Playwright E2E suite, run against each PR’s temporary environment, sharded and required.',
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
] as const satisfies readonly Education[]

/** The career before code: some twenty years of responsibility roles. */
export const PAST_CAREER = {
  intro: {
    fr: 'Avant de coder, j’ai passé une vingtaine d’années à diriger\u00a0: des équipes, des budgets, des chantiers, puis mes propres entreprises. J’y ai appris à décider, à prioriser sous contrainte et à rendre des comptes. Et pour avoir payé des salaires, je sais ce que vaut une heure de travail.',
    en: 'Before coding, I spent some twenty years running things: teams, budgets, building projects, then my own companies. It taught me to make decisions, prioritize under constraints and be accountable. And having paid salaries, I know what an hour of work is worth.',
  },
  strengths: {
    fr: [
      'Management d’équipe',
      'Gestion budgétaire',
      'Pilotage de projets',
      'Relation client',
      'Communication et marketing',
      'Entrepreneuriat',
    ],
    en: [
      'Team management',
      'Budget management',
      'Project management',
      'Customer relations',
      'Communication & marketing',
      'Entrepreneurship',
    ],
  },
  /** Newest first. */
  positions: [
    {
      organization: 'ECOPHONE 44 / Nantes Repair',
      about: {
        fr: 'Réparation et vente de smartphones et tablettes, 2 à 3\u00a0salariés, revendue en 2020',
        en: 'Phone and tablet repair and sales, 2–3 employees, sold in 2020',
      },
      start: '2015',
      end: '2020',
      role: { fr: 'Co-gérant associé', en: 'Co-managing partner' },
      details: {
        fr: 'Réparations rapides de smartphones, tablettes et ordinateurs, avec ou sans rendez-vous, à domicile ou par coursier, et vente d’appareils reconditionnés. Gestion administrative et comptable, communication et marketing.',
        en: 'Fast repairs of phones, tablets and computers, with or without an appointment, at home or by courier, and refurbished device sales. Administration and accounting, communication and marketing.',
      },
    },
    {
      organization: 'Radio Prun’',
      about: {
        fr: 'Radio associative nantaise, 7\u00a0salariés et 200\u00a0bénévoles',
        en: 'Nantes community radio station, 7 employees and 200 volunteers',
      },
      start: '2007',
      end: '2012',
      role: { fr: 'Directeur', en: 'Director' },
      details: {
        fr: 'Direction de la structure, de l’antenne et des programmes\u00a0: ligne éditoriale, stratégie de communication et développement technique.',
        en: 'Ran the organization, the station and its programming: editorial line, communication strategy and technical development.',
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
    page: MEGA_SERIES_PATHS,
    description: {
      fr: 'Suivi de séries multi-utilisateur\u00a0: catalogue TMDB, collection, watchlist et suivi épisode par épisode. Conçu, développé et mis en production seul en pilotant des agents IA, en parallèle d’un CDI à temps plein.',
      en: 'Multi-user TV series tracker: TMDB catalog, collection, watchlist and episode-by-episode tracking. Designed, built and shipped solo by driving AI agents, alongside a full-time job.',
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
  {
    name: 'jonathan-scattolini.fr',
    url: 'https://github.com/Megakrash/mega-cv',
    urlLabel: { fr: 'Code source', en: 'Source code' },
    brief: true,
    description: {
      fr: 'Site personnel traité comme un produit\u00a0: statique, bilingue, sans traceur ni service tiers. Le CV en PDF est généré à partir des mêmes données et pensé pour les logiciels de recrutement.',
      en: 'Personal site built like a product: static, bilingual, with no tracker or third-party service. The PDF CV is generated from the same data and designed for applicant tracking systems.',
    },
    highlights: [
      {
        fr: 'CV d’une page imprimé par Chrome sans interface, refusé par la CI s’il n’est plus à jour',
        en: 'One-page CV printed by headless Chrome, rejected by CI when it is out of date',
      },
      {
        fr: 'Politique de sécurité du contenu stricte\u00a0: aucun script ni style en ligne, aucune origine tierce',
        en: 'Strict Content Security Policy: no inline script or style, no third-party origin',
      },
      {
        fr: 'Code public, déployé en continu avec Docker et nginx',
        en: 'Public code, continuously deployed with Docker and nginx',
      },
    ],
    stack: ['Astro', 'TypeScript', 'CSS', 'Docker', 'nginx', 'GitHub Actions', 'Coolify'],
  },
] as const satisfies readonly Project[]
