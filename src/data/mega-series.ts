/*
 * Content of the mega-series project page, in both languages. Like the lists
 * of profile.ts, each item carries both languages.
 *
 * Nothing here may help an attacker: no addresses, identifiers, provider or
 * bucket names, thresholds or limits of the production setup.
 */

import type { ImageMetadata } from 'astro'

import collection from '../assets/mega-series/collection.webp'
import episodes from '../assets/mega-series/episodes.webp'
import landing from '../assets/mega-series/landing.webp'
import movies from '../assets/mega-series/movies.webp'
import show from '../assets/mega-series/show.webp'
import top100 from '../assets/mega-series/top100.webp'

import type { Localized, Text } from './profile'

export const MEGA_SERIES = {
  metaTitle: 'mega-series · Jonathan Scattolini',
  metaDescription: {
    fr: 'mega-series, application de suivi de séries et de films conçue, développée et exploitée seul par Jonathan Scattolini en pilotant des agents IA.',
    en: 'mega-series, a TV series and movie tracker designed, built and run solo by Jonathan Scattolini by driving AI agents.',
  },
  /** Shown above the title, like a shell path. */
  path: { fr: '~/projets/mega-series', en: '~/projects/mega-series' },
  pitch: {
    fr: 'Application de suivi de séries et de films, conçue, développée et exploitée seul en pilotant des agents IA. En production depuis juin 2026.',
    en: 'A TV series and movie tracker, designed, built and run solo by driving AI agents. In production since June 2026.',
  },
  /** When the figures below were measured. */
  figuresNote: { fr: 'Chiffres de novembre 2026', en: 'Figures as of November 2026' },
  /** Text alternative of the page's link preview image. */
  previewAlt: {
    fr: 'mega-series, en production : application de suivi de séries et de films, avec une capture de la collection de séries en cours.',
    en: 'mega-series, in production: a TV series and movie tracker, with a screenshot of the collection of shows in progress.',
  },
} as const satisfies {
  metaTitle: string
  metaDescription: Localized
  path: Localized
  pitch: Localized
  figuresNote: Localized
  previewAlt: Localized
}

/** Key figures: each reads as one sentence, the value first. */
export const MEGA_SERIES_FIGURES = [
  {
    value: { fr: '4,5', en: '4.5' },
    label: {
      fr: 'mois, du premier commit à la version 2.4',
      en: 'months from first commit to version 2.4',
    },
  },
  {
    value: { fr: '73', en: '73' },
    label: { fr: 'versions mises en production', en: 'releases shipped to production' },
  },
  {
    value: { fr: '≈ 80 000', en: '~80,000' },
    label: {
      fr: 'lignes de TypeScript et de Vue, dont un tiers de tests',
      en: 'lines of TypeScript and Vue, a third of them tests',
    },
  },
  {
    value: { fr: '1 500+', en: '1,500+' },
    label: { fr: 'tests rejoués par la CI à chaque push', en: 'tests run by CI on every push' },
  },
  {
    value: { fr: '130', en: '130' },
    label: {
      fr: 'opérations GraphQL typées de bout en bout',
      en: 'GraphQL operations, typed end to end',
    },
  },
  {
    value: { fr: '1', en: '1' },
    label: { fr: 'développeur, épaulé par des agents IA', en: 'developer, backed by AI agents' },
  },
] as const satisfies readonly { value: Localized; label: Localized }[]

interface PageSection {
  /** Which section this is: the page adds the diagram or the gallery from it. */
  key: 'context' | 'work' | 'architecture' | 'operations' | 'quality' | 'screenshots'
  /** Anchor id, localized like the home page sections. */
  id: Localized
  title: Localized
  intro?: Localized
  points: readonly Localized[]
}

/** Sections of the page, in page order (this order numbers them). */
export const MEGA_SERIES_SECTIONS: readonly PageSection[] = [
  {
    key: 'context',
    id: { fr: 'contexte', en: 'context' },
    title: { fr: 'Le contexte', en: 'Context' },
    intro: {
      fr: 'mega-series est né d’un besoin personnel : suivre les séries que je regarde, épisode par épisode. C’est devenu une vraie application multi-utilisateur, en production sur mega-series.fr.',
      en: 'mega-series started from a personal need: keeping track of the shows I watch, episode by episode. It grew into a real multi-user application, live at mega-series.fr.',
    },
    points: [
      {
        fr: 'Catalogue TMDB : recherche, fiches séries, films et personnes, bandes-annonces, Top 100.',
        en: 'TMDB catalog: search, show, movie and people pages, trailers, Top 100.',
      },
      {
        fr: 'Suivi : collection, watchlist, épisodes cochés un à un, par saison ou d’un coup. Les titres passent seuls de « à voir » à « en cours », et un mode films gère aussi les sagas.',
        en: 'Tracking: collection, watchlist, episodes ticked one by one, by season or all at once. Titles move from “to watch” to “watching” on their own, and a movie mode also handles franchises.',
      },
      {
        fr: '« Où regarder » : les plateformes de streaming qui proposent chaque titre, croisées avec celles de l’utilisateur.',
        en: '“Where to watch”: the streaming services offering each title, matched against the user’s own.',
      },
      {
        fr: 'Social : les « coupaings », avec invitations, activité et recommandations entre amis.',
        en: 'Social: friends, with invitations, activity and recommendations.',
      },
      {
        fr: 'Notifications en temps réel et récapitulatif quotidien par e-mail.',
        en: 'Real-time notifications and a daily email digest.',
      },
      {
        fr: 'Application installable (PWA) et back-office d’administration.',
        en: 'Installable web app (PWA) and an admin back office.',
      },
    ],
  },
  {
    key: 'work',
    id: { fr: 'realisation', en: 'what-i-did' },
    title: { fr: 'Ce que j’ai fait', en: 'What I did' },
    intro: {
      fr: 'J’ai tenu tous les rôles : produit, conception, développement front et back, infrastructure, sécurité, exploitation. Le code est écrit par des agents IA que je pilote : je cadre chaque évolution, je découpe le travail, je relis et je valide. Mon rôle ressemble à celui d’un lead technique à la tête d’une équipe très rapide.',
      en: 'I played every role: product, design, front-end and back-end development, infrastructure, security, operations. The code is written by AI agents that I drive: I frame each change, split the work, review and approve. The role is close to a tech lead running a very fast team.',
    },
    points: [
      {
        fr: 'Cadrage technique : choix de la stack, découpage du monorepo, modèle de données, conventions.',
        en: 'Technical framing: stack, monorepo layout, data model, conventions.',
      },
      {
        fr: 'Méthode : une mémoire de projet persistante, des skills maison pour les commits et les notes de version, et une vérification de l’interface par l’agent lui-même dans le navigateur.',
        en: 'Method: persistent project memory, custom skills for commits and release notes, and UI checks run by the agent itself in the browser.',
      },
      {
        fr: 'Audit avant lancement en trois phases (qualité, montée en charge, sécurité) : une session « pilote » rédige les consignes, chaque correctif est fait dans une session dédiée, puis le pilote le relit.',
        en: 'A three-phase pre-launch audit (quality, scalability, security): a “pilot” session writes the briefs, each fix is made in its own session, then the pilot reviews it.',
      },
      {
        fr: 'Exploitation au quotidien : déploiements, sauvegardes, suivi des erreurs, mises à jour de sécurité.',
        en: 'Day-to-day operations: deployments, backups, error tracking, security updates.',
      },
    ],
  },
  {
    key: 'architecture',
    id: { fr: 'architecture', en: 'architecture' },
    title: { fr: 'Architecture', en: 'Architecture' },
    intro: {
      fr: 'Un monorepo pnpm en TypeScript strict : cinq paquets et un seul langage, du navigateur jusqu’à l’API.',
      en: 'A pnpm monorepo in strict TypeScript: five packages and one language, from the browser to the API.',
    },
    points: [
      {
        fr: 'Fronts : Vue 3, Vite, Vuetify, Pinia, Apollo Client. L’application web est une PWA installable, qui propose la mise à jour quand une nouvelle version sort.',
        en: 'Front ends: Vue 3, Vite, Vuetify, Pinia, Apollo Client. The web app is an installable PWA that offers to update when a new version ships.',
      },
      {
        fr: 'Backend : NestJS et une API GraphQL code-first, avec des abonnements temps réel en WebSocket et des tâches planifiées (synchronisation nocturne du catalogue, récapitulatif par e-mail).',
        en: 'Back end: NestJS with a code-first GraphQL API, real-time subscriptions over WebSocket and scheduled jobs (nightly catalog sync, email digest).',
      },
      {
        fr: 'Types générés de bout en bout : le backend produit le schéma, GraphQL Codegen en tire le type de chaque opération, et les deux fronts les partagent avec les énumérations du domaine. Un changement d’API casse la compilation, pas la production.',
        en: 'End-to-end generated types: the back end produces the schema, GraphQL Codegen derives a type for every operation, and both front ends share them along with the domain enums. An API change breaks the build, not production.',
      },
      {
        fr: 'Données : PostgreSQL et TypeORM, avec des migrations versionnées appliquées au démarrage. Redis sert de cache (catalogue, sessions), de compteur pour la limitation de débit et de verrou pour les tâches, avec un repli s’il tombe.',
        en: 'Data: PostgreSQL and TypeORM, with versioned migrations applied at startup. Redis serves as a cache (catalog, sessions), a rate-limit counter and a job lock, with a fallback if it goes down.',
      },
      {
        fr: 'Performances : des DataLoaders contre les requêtes N+1. La page de collection est passée de 905 à 11 requêtes SQL.',
        en: 'Performance: DataLoaders against N+1 queries. The collection page went from 905 SQL queries to 11.',
      },
    ],
  },
  {
    key: 'operations',
    id: { fr: 'infra', en: 'infrastructure' },
    title: { fr: 'Infra & exploitation', en: 'Infrastructure & operations' },
    points: [
      {
        fr: 'Images Docker multi-étapes aux versions épinglées. nginx sert les fronts et relaie l’API, qui n’est jamais exposée directement.',
        en: 'Multi-stage Docker images with pinned versions. nginx serves the front ends and proxies the API, which is never exposed directly.',
      },
      {
        fr: 'Un VPS piloté par Coolify, derrière Traefik et Let’s Encrypt. Chaque push sur main déclenche un déploiement, et une page de maintenance prend le relais pendant la mise à jour.',
        en: 'One VPS driven by Coolify, behind Traefik and Let’s Encrypt. Every push to main triggers a deployment, and a maintenance page takes over during the update.',
      },
      {
        fr: 'Sauvegardes chiffrées chaque nuit, vérifiées puis copiées chez deux hébergeurs distincts, dont une copie immuable pendant 30 jours. La restauration a été testée.',
        en: 'Nightly encrypted backups, checked, then copied to two separate providers, one copy immutable for 30 days. Restore has been tested.',
      },
      {
        fr: 'Sécurité : mots de passe hachés avec argon2, sessions révocables, double authentification pour l’administration, limitation de débit, garde-fous sur la complexité des requêtes GraphQL, en-têtes de sécurité HTTP.',
        en: 'Security: passwords hashed with argon2, revocable sessions, two-factor authentication for the admin, rate limiting, guards on GraphQL query complexity, HTTP security headers.',
      },
      {
        fr: 'Erreurs collectées par l’application elle-même et consultées dans le back-office, sans service tiers.',
        en: 'Errors collected by the application itself and reviewed in the back office, with no third-party service.',
      },
      {
        fr: 'Versioning sémantique : à chaque mise en production, une note de version apparaît dans l’application, et le tag et la release GitHub sont créés automatiquement.',
        en: 'Semantic versioning: every production release shows a release note in the app, and its tag and GitHub release are created automatically.',
      },
    ],
  },
  {
    key: 'quality',
    id: { fr: 'qualite', en: 'quality' },
    title: { fr: 'Qualité', en: 'Quality' },
    points: [
      {
        fr: 'Plus de 1 500 tests : Jest côté backend, Vitest et Vue Test Utils côté front. Les tests du front échouent au moindre avertissement dans la console.',
        en: '1,500+ tests: Jest on the back end, Vitest and Vue Test Utils on the front end. Front-end tests fail on any console warning.',
      },
      {
        fr: 'CI GitHub Actions à chaque push : typage, lint, tests et build.',
        en: 'GitHub Actions CI on every push: type checking, lint, tests and build.',
      },
      {
        fr: 'TypeScript strict, ESLint sans aucun avertissement toléré, Prettier, commits conventionnels vérifiés par commitlint.',
        en: 'Strict TypeScript, ESLint with zero warnings allowed, Prettier, conventional commits checked by commitlint.',
      },
      {
        fr: 'Test de charge avant le lancement, pour connaître les limites du serveur.',
        en: 'A load test before launch, to know the server’s limits.',
      },
      {
        fr: 'Dépendances surveillées par Dependabot, avec des alertes corrigées au fil de l’eau.',
        en: 'Dependencies watched by Dependabot, with alerts fixed as they come.',
      },
    ],
  },
  {
    key: 'screenshots',
    id: { fr: 'captures', en: 'screenshots' },
    title: { fr: 'Captures d’écran', en: 'Screenshots' },
    intro: {
      fr: 'Captures réalisées avec un compte de démonstration.',
      en: 'Screenshots taken with a demo account.',
    },
    points: [],
  },
]

interface DiagramNode {
  name: Text
  detail: Text
}

/** Production architecture, drawn by ArchitectureDiagram.astro. */
export const ARCHITECTURE = {
  caption: {
    fr: 'L’architecture de production de mega-series, et les chaînes qui entourent le code',
    en: 'The production architecture of mega-series, and the pipelines around the code',
  },
  clients: {
    label: { fr: 'Navigateurs', en: 'Browsers' },
    nodes: [
      { name: { fr: 'Application web', en: 'Web app' }, detail: 'Vue 3 · PWA' },
      { name: { fr: 'Back-office', en: 'Back office' }, detail: 'Vue 3 · 2FA' },
    ],
  },
  /** How the browsers reach the server. */
  transport: 'HTTPS · WebSocket',
  server: {
    label: 'VPS · Coolify',
    /** From the edge to the data, one row per layer. */
    layers: [
      [{ name: 'Traefik', detail: 'TLS · Let’s Encrypt' }],
      [
        {
          name: 'nginx',
          detail: { fr: 'fronts statiques · relais de l’API', en: 'static front ends · API proxy' },
        },
      ],
      [
        {
          name: { fr: 'API NestJS', en: 'NestJS API' },
          detail: {
            fr: 'GraphQL · temps réel · tâches planifiées',
            en: 'GraphQL · real time · scheduled jobs',
          },
        },
      ],
      [
        { name: 'PostgreSQL', detail: 'TypeORM · migrations' },
        {
          name: 'Redis',
          detail: {
            fr: 'cache · limitation de débit · verrous',
            en: 'cache · rate limits · locks',
          },
        },
      ],
    ],
  },
  /** How the server reaches what lives outside it. */
  outbound: { fr: 'appels sortants · sauvegardes', en: 'outbound calls · backups' },
  outside: [
    {
      name: { fr: 'Services externes', en: 'External services' },
      detail: { fr: 'TMDB · Google · e-mail', en: 'TMDB · Google · email' },
    },
    {
      name: { fr: 'Sauvegardes', en: 'Backups' },
      detail: { fr: 'chiffrées · 2 copies hors site', en: 'encrypted · 2 off-site copies' },
    },
  ],
  /** Pipelines around the code, as ordered steps. */
  flows: [
    {
      title: { fr: 'Types générés', en: 'Generated types' },
      steps: [
        'NestJS',
        { fr: 'schéma GraphQL', en: 'GraphQL schema' },
        'GraphQL Codegen',
        { fr: 'types partagés', en: 'shared types' },
        { fr: 'fronts Vue', en: 'Vue front ends' },
      ],
    },
    {
      title: { fr: 'Livraison', en: 'Delivery' },
      steps: [
        'git push',
        { fr: 'CI GitHub Actions', en: 'GitHub Actions CI' },
        { fr: 'PR de release', en: 'release PR' },
        { fr: 'merge sur main', en: 'merge to main' },
        { fr: 'déploiement et release', en: 'deploy and release' },
      ],
    },
  ],
} as const satisfies {
  caption: Localized
  clients: { label: Localized; nodes: readonly DiagramNode[] }
  transport: string
  server: { label: string; layers: readonly (readonly DiagramNode[])[] }
  outbound: Localized
  outside: readonly DiagramNode[]
  flows: readonly { title: Localized; steps: readonly Text[] }[]
}

/**
 * Screenshots of mega-series.fr, taken with a demo account so that no other
 * user's data shows. `url` is shown in the window title bar.
 */
export const MEGA_SERIES_SCREENSHOTS = [
  {
    image: landing,
    url: 'mega-series.fr',
    alt: {
      fr: 'Page d’accueil publique de mega-series : une accroche sur la saison 3 et les boutons de création de compte',
      en: 'The public landing page of mega-series: a headline about season 3 and the sign-up buttons',
    },
    caption: {
      fr: 'La page d’accueil, pour les visiteurs non connectés.',
      en: 'The landing page, for signed-out visitors.',
    },
  },
  {
    image: collection,
    url: 'mega-series.fr/collection',
    alt: {
      fr: 'Grille d’affiches des séries en cours, chacune avec sa note, sa progression et son prochain épisode',
      en: 'Poster grid of the shows in progress, each with its rating, progress and next episode',
    },
    caption: {
      fr: 'Les séries en cours, avec la progression et le prochain épisode à voir.',
      en: 'Shows in progress, with progress and the next episode to watch.',
    },
  },
  {
    image: show,
    url: 'mega-series.fr/show/…',
    alt: {
      fr: 'Fiche de la série Severance : affiche, résumé, plateformes de streaming, progression et note sur 10',
      en: 'Severance show page: poster, synopsis, streaming services, progress and rating out of 10',
    },
    caption: {
      fr: 'Une fiche série : où la regarder, la progression et la note.',
      en: 'A show page: where to watch it, progress and rating.',
    },
  },
  {
    image: episodes,
    url: 'mega-series.fr/show/…',
    alt: {
      fr: 'Épisodes de la saison 2 de Severance, les cinq premiers cochés et le sixième marqué « À suivre »',
      en: 'Severance season 2 episodes, the first five ticked and the sixth marked “up next”',
    },
    caption: {
      fr: 'Le suivi épisode par épisode, saison par saison.',
      en: 'Episode-by-episode tracking, season by season.',
    },
  },
  {
    image: top100,
    url: 'mega-series.fr/search',
    alt: {
      fr: 'Top 100 des séries, avec pour chaque titre sa note, ainsi que le statut et la note de l’utilisateur',
      en: 'Top 100 shows, each with its rating plus the user’s status and rating',
    },
    caption: {
      fr: 'Le Top 100, avec le statut et la note de l’utilisateur.',
      en: 'The Top 100, with the user’s status and rating.',
    },
  },
  {
    image: movies,
    url: 'mega-series.fr/films/vus',
    alt: {
      fr: 'Mode films aux couleurs violettes : films vus avec leur saga, leur note et leur durée',
      en: 'Movie mode in purple: watched movies with their franchise, rating and runtime',
    },
    caption: {
      fr: 'Le mode films, en violet : films vus, sagas et notes.',
      en: 'Movie mode, in purple: watched movies, franchises and ratings.',
    },
  },
] as const satisfies readonly {
  image: ImageMetadata
  url: string
  alt: Localized
  caption: Localized
}[]
