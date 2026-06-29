import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Free Business Listings Directory',
      description: 'Explore thousands of listings in various categories. Post your listings for free and connect with the right audience today.',
      openGraphTitle: 'Free Business Listings — Premium Directory',
      openGraphDescription: 'Discover businesses, services, and listings across every category. Post free and get found today.',
      keywords: ['business listings', 'directory', 'local business', 'free listings', 'find businesses'],
    },
    hero: {
      badge: 'Trusted by thousands of businesses',
      title: ['Free Business Listing On', "The Premium Directory"],
      description: 'Explore thousands of listings in various categories. Post your listings for free and connect with the right audience today.',
      primaryCta: { label: 'Browse Directory', href: '/search' },
      secondaryCta: { label: 'Post Your Listing', href: '/create' },
      searchPlaceholder: 'What are you looking for?',
      focusLabel: 'Search',
      featureCardBadge: 'featured listing',
      featureCardTitle: 'Discover the best local businesses.',
      featureCardDescription: 'Browse thousands of listings across every category and location.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Find everything in one connected directory.',
      paragraphs: [
        'This platform brings together business listings, articles, visual galleries, and resources so you can discover everything in one place.',
        'Whether you are looking for a local business, a service provider, or a resource, our directory makes it easy to find and connect.',
        'Post your listing for free and reach thousands of potential customers today.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Thousands of verified business listings across every category.',
        'Easy discovery with powerful search and category filters.',
        'Connect directly with businesses and service providers.',
        'Free listing posting for all businesses.',
      ],
      primaryLink: { label: 'Browse Directory', href: '/search' },
      secondaryLink: { label: 'Post Free', href: '/create' },
    },
    cta: {
      badge: 'Get listed today',
      title: 'Add your business and reach thousands of customers.',
      description: 'Post your listing for free, add your business details, and start connecting with your audience today.',
      primaryCta: { label: 'Add Your Listing', href: '/create' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest listings in this section.',
    },
  },
  about: {
    badge: 'About Us',
    title: 'A premium directory built for discovery.',
    description: `${slot4BrandConfig.siteName} is built to make finding the right business, service, or resource as simple and seamless as possible.`,
    paragraphs: [
      'We connect businesses with customers through a clean, modern directory that makes discovery fast and reliable.',
      'Whether you are searching for a local service or looking to list your own business, our platform is designed to deliver results.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'Powerful search and filters help visitors find exactly what they need across thousands of listings.',
      },
      {
        title: 'Free for businesses',
        description: 'Any business can post a free listing and connect with thousands of potential customers.',
      },
      {
        title: 'Trusted and verified',
        description: 'We maintain clean, accurate listing data so users can trust what they find in our directory.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get in touch with our team.',
    description: 'Have a question about listings, partnerships, or your account? Reach out and we will get back to you quickly.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search Listings',
      description: 'Search businesses, listings, articles, and resources across the directory.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find businesses, services, and listings faster.',
      description: 'Use keywords, categories, and filters to discover listings from every section of the directory.',
      placeholder: 'Search by keyword, business name, or category',
    },
    resultsTitle: 'Search results',
  },
  create: {
    metadata: {
      title: 'Add Your Listing',
      description: 'Post your business listing for free and reach thousands of potential customers.',
    },
    locked: {
      badge: 'Listing access',
      title: 'Sign in to add your listing.',
      description: 'Create an account to post your business listing, add details, images, and reach your audience.',
    },
    hero: {
      badge: 'Add your listing',
      title: 'Post your business for free.',
      description: 'Add your business details, images, contact information, and start getting discovered today.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Post listing',
    successTitle: 'Your listing has been submitted.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your directory account.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Sign in to manage your listings, save favourites, and connect with businesses.',
      formTitle: 'Sign In',
      submitLabel: 'Sign In',
      noAccount: 'No account found. Create an account first, then sign in.',
      success: 'Signed in successfully. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your directory account.',
      badge: 'Create account',
      title: 'Join the directory.',
      description: 'Create an account to post listings, save favourites, and get full access to the directory.',
      formTitle: 'Create Account',
      submitLabel: 'Create Account',
      passwordShort: 'Use at least 4 characters for your password.',
      success: 'Account created. Redirecting...',
      loginCta: 'Sign In',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Similar listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Website',
    },
  },
} as const
