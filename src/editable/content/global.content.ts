import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'The Directory For Every Need.',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'The Directory For Every Need.',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Add Your Listing', href: '/create' },
      secondary: { label: 'Sign In', href: '/login' },
    },
  },
  footer: {
    tagline: 'The Directory For Every Need.',
    description: 'Explore thousands of listings across various categories. Post your listings for free and connect with the right audience today.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'Resources', href: '/pdf' },
          { label: 'About Us', href: '/about' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign In', href: '/login' },
          { label: 'Add Listing', href: '/create' },
        ],
      },
    ],
    bottomNote: 'Free business listings. Connect with the right audience.',
  },
  commonLabels: {
    readMore: 'View Details',
    viewAll: 'View All',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Posted',
  },
} as const
