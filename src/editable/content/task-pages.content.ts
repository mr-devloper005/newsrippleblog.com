import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Articles',
    headline: 'In-depth articles, guides, and stories.',
    description: 'Explore long-form articles, expert guides, and curated stories across every topic in the directory.',
    filterLabel: 'Filter by topic',
    secondaryNote: 'Quality editorial content across every category.',
    chips: ['Editorial', 'Guides', 'Long reads', 'Expert content'],
  },
  classified: {
    eyebrow: 'Classifieds',
    headline: 'Browse offers, deals, and classified listings.',
    description: 'Find fast-moving classifieds, time-sensitive offers, and direct listings ready to act on.',
    filterLabel: 'Filter category',
    secondaryNote: 'Quick-scan listings updated regularly.',
    chips: ['Offers', 'Deals', 'Quick listings', 'Buy & Sell'],
  },
  sbm: {
    eyebrow: 'Resources',
    headline: 'Curated resources and useful bookmarks.',
    description: 'Discover saved resources, useful links, tools, and references curated for easy browsing.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Quality resources organised for easy discovery.',
    chips: ['Resources', 'Tools', 'Collections', 'References'],
  },
  profile: {
    eyebrow: 'Profiles',
    headline: 'Discover businesses, creators, and professionals.',
    description: 'Browse profiles of businesses, service providers, and professionals across every category.',
    filterLabel: 'Filter profile type',
    secondaryNote: 'Trusted profiles verified across the directory.',
    chips: ['Businesses', 'Professionals', 'Creators', 'Services'],
  },
  pdf: {
    eyebrow: 'Documents',
    headline: 'Downloadable guides, reports, and documents.',
    description: 'Access a library of downloadable PDFs, reports, and reference documents across every category.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Useful documents ready to download and reference.',
    chips: ['Guides', 'Reports', 'Documents', 'Downloads'],
  },
  listing: {
    eyebrow: 'Business Directory',
    headline: 'Find and compare the best local businesses.',
    description: 'Browse thousands of verified business listings across every category. Find, compare, and connect with the right businesses today.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Verified listings with full business details.',
    chips: ['All Businesses', 'Local Services', 'Restaurants', 'Healthcare', 'Real Estate', 'Technology'],
  },
  image: {
    eyebrow: 'Gallery',
    headline: 'Visual gallery — images from across the directory.',
    description: 'Browse a curated visual gallery of images, photos, and visual content from listings and posts.',
    filterLabel: 'Filter visual type',
    secondaryNote: 'High-quality visuals across every category.',
    chips: ['Gallery', 'Photos', 'Visual content', 'Showcase'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
