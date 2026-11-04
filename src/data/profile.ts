import type { Lang } from '../i18n/ui'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jonathanscattolini/'
export const GITHUB_URL = 'https://github.com/Megakrash'

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
