import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const PREMIUM_FONT = "'Plus Jakarta Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: true,
  fontDisplay: PREMIUM_FONT,
  fontBody: PREMIUM_FONT,
  bg: '#0f0d08',
  surface: '#1c1912',
  raised: '#221e14',
  text: '#ECE7D1',
  muted: '#8E977D',
  line: 'rgba(219, 206, 165, 0.10)',
  accent: '#8A7650',
  accentSoft: 'rgba(138, 118, 80, 0.12)',
  onAccent: '#ECE7D1',
  glow: 'rgba(138, 118, 80, 0.08)',
  radius: '0.875rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with local businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Resources', note: 'Curated links and resources worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'Profiles', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
