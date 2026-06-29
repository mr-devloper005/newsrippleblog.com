import Link from 'next/link'
import {
  ArrowRight, Award, Bookmark, Building2, Calculator, ChevronRight, Coffee, Code2,
  FileText, GraduationCap, Heart, Image as ImageIcon, Leaf, Layers, Megaphone,
  MapPin, Search, Sparkles, Star, TrendingUp, Users, UserRound, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, getEditableExcerpt, getEditableCategory } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function locationOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.location === 'string' && content.location) ||
    (typeof content.address === 'string' && content.address) ||
    (typeof content.city === 'string' && content.city) || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.8 + (h % 12) / 10) * 10) / 10
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function timeAgo(post: SitePost) {
  const date = post.publishedAt || post.updatedAt || post.createdAt
  if (!date) return ''
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 1) return 'Today'
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  if (months < 13) return `${months} month${months > 1 ? 's' : ''} ago`
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`}
        />
      ))}
    </span>
  )
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ============================= HERO SECTION ============================= */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title || ['Free Business Listing On', "The Premium Directory"]
  const titleLine1 = Array.isArray(heroTitle) ? heroTitle[0] : String(heroTitle).split(' ').slice(0, 4).join(' ')
  const titleLine2 = Array.isArray(heroTitle) ? heroTitle[1] : String(heroTitle).split(' ').slice(4).join(' ')
  const HIDDEN_TASK_KEYS = ['listing', 'image']
  const categories = SITE_CONFIG.tasks.filter((t) => t.enabled && !HIDDEN_TASK_KEYS.includes(t.key)).slice(0, 8)

  return (
    <section className="relative">
      {/* Background image collage */}
      <div className="relative h-[520px] w-full overflow-hidden sm:h-[580px] lg:h-[640px]">
        <EditableHeroCollage images={heroImages} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,4,0.55)_0%,rgba(8,7,4,0.25)_40%,rgba(8,7,4,0.72)_100%)]" />

        <div className={`relative flex h-full flex-col items-center justify-center text-center ${container}`}>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)]/40 bg-[var(--slot4-accent-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
              {pagesContent.home.hero.badge}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              {titleLine1}
            </h1>
            <h1 className="mt-1 text-balance text-4xl font-extrabold leading-[1.06] text-[var(--slot4-accent)] sm:text-5xl lg:text-6xl">
              {titleLine2}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              {pagesContent.home.hero.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={pagesContent.home.hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-bold text-[var(--slot4-on-accent)] shadow-[0_8px_28px_rgba(138,118,80,0.5)] transition hover:brightness-110"
              >
                {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={pagesContent.home.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {pagesContent.home.hero.secondaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Search form */}
          <div className="mt-8 w-full max-w-2xl">
            <form
              action="/search"
              className="flex overflow-hidden rounded-2xl bg-[var(--slot4-surface-bg)]/95 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm"
            >
              <div className="flex flex-1 items-center gap-2.5 border-r border-[var(--editable-border)] px-5">
                <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                <input
                  name="q"
                  placeholder={pagesContent.home.hero.searchPlaceholder}
                  className="w-full bg-transparent py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 bg-[var(--slot4-accent)] px-7 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-110 sm:px-9"
              >
                Search
              </button>
            </form>
          </div>

          {/* Category chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href={primaryRoute}
              className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              All Categories
            </Link>
            {categories.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="rounded-full border border-white/20 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm transition hover:bg-white/18 hover:text-white"
              >
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4 text-sm text-[var(--slot4-muted-text)] ${container}`}>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" /> Verified listings</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Local &amp; nationwide</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><Zap className="h-4 w-4 text-[var(--slot4-accent)]" /> Free to list</span>
          <Link href={primaryRoute} className="inline-flex items-center gap-1 font-semibold text-[var(--slot4-accent)] hover:underline">
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ========================= CATEGORY SECTION ========================= */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const HIDDEN_TASK_KEYS = ['listing', 'image']
  const categories = SITE_CONFIG.tasks.filter((t) => t.enabled && !HIDDEN_TASK_KEYS.includes(t.key))
  if (!categories.length) return null

  // Extend icon variety for category cards
  const extendedIcons: typeof taskIcon = {
    article: FileText,
    listing: Building2,
    classified: Megaphone,
    image: ImageIcon,
    sbm: Bookmark,
    pdf: Layers,
    profile: UserRound,
  }

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">CATEGORY</p>
          <h2 className="editable-display mt-3 text-3xl font-extrabold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
            Most Popular Category
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--slot4-muted-text)]">
            Explore the most popular categories with the highest number of listings and top choices.
          </p>
        </div>

        {/* Category grid — 3 per row mobile, 6 per row desktop */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((task, index) => {
            const Icon = extendedIcons[task.key] || FileText
            const bgRotations = [
              'rgba(138,118,80,0.08)',
              'rgba(142,151,125,0.08)',
              'rgba(219,206,165,0.06)',
              'rgba(138,118,80,0.10)',
              'rgba(142,151,125,0.10)',
              'rgba(219,206,165,0.08)',
            ]
            const bg = bgRotations[index % bgRotations.length]
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group flex flex-col items-center gap-3.5 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-7 text-center transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_12px_36px_rgba(138,118,80,0.16)]"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--slot4-accent)]/20 transition duration-300 group-hover:scale-105 group-hover:border-[var(--slot4-accent)]/40"
                  style={{ background: bg }}
                >
                  <Icon className="h-7 w-7 text-[var(--slot4-accent)]" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{task.label}</span>
                <span className="rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-on-accent)]">
                  View listings
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-7 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-accent)]"
          >
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ======================== POPULAR LISTINGS SECTION ======================== */
function ListingCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post) || getEditableCategory(post)
  const location = locationOf(post)
  const rating = ratingOf(post)
  const ago = timeAgo(post)
  const Icon = Building2

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_12px_40px_rgba(138,118,80,0.16)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Heart favourite */}
        <button
          type="button"
          aria-label="Save"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-[var(--slot4-accent)] hover:text-white"
        >
          <Heart className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {category ? (
            <span className="truncate text-xs font-medium text-[var(--slot4-muted-text)]">{category}</span>
          ) : null}
        </div>

        {/* Title + rating */}
        <Link href={href} className="mt-3 block">
          <h3 className="editable-display line-clamp-1 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
        </div>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--slot4-muted-text)]">
          {location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
              <span className="line-clamp-1">{location}</span>
            </span>
          ) : null}
          {ago ? (
            <span className="inline-flex items-center gap-1">
              <span>{ago}</span>
            </span>
          ) : null}
        </div>

        {/* View details link */}
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] transition hover:underline"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)]).slice(0, 8)
  if (!pool.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        {/* Heading */}
        <div className="mb-10 flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">POPULAR LISTINGS</p>
            <h2 className="editable-display mt-3 text-3xl font-extrabold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
              Explore Our Popular Listings
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-[var(--slot4-muted-text)] sm:mx-0">
              Check our popular business listings available across every category.
            </p>
          </div>
          <Link
            href={primaryRoute}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] hover:underline sm:inline-flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Listing grid — 4 columns */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pool.map((post) => (
            <ListingCard
              key={post.id || post.slug}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
            />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)] hover:underline"
          >
            View All Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ============================ STATS + MORE POSTS ============================ */

const STATS = [
  { icon: Layers, value: '200+', label: 'Listings Listed' },
  { icon: Users, value: '850+', label: 'Happy Clients' },
  { icon: TrendingUp, value: '500+', label: 'Daily Visitors' },
  { icon: Award, value: '50+', label: 'Win Awards' },
]

function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post) || getEditableCategory(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_8px_28px_rgba(138,118,80,0.14)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">
          {getExcerpt(post, 110)}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--slot4-accent)]">
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh This Week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending Now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)

  return (
    <>
      {/* Stats counter section */}
      <section className="bg-[var(--slot4-surface-bg)]">
        <div className={`py-14 sm:py-16 ${container}`}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--slot4-accent)] shadow-[0_8px_24px_rgba(138,118,80,0.40)]">
                  <Icon className="h-7 w-7 text-[var(--slot4-on-accent)]" />
                </span>
                <div>
                  <p className="editable-display text-3xl font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)]">{value}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--slot4-muted-text)]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post collection sections */}
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-page-bg)]' : 'bg-[var(--slot4-surface-bg)]'}>
            <div className={`py-14 sm:py-16 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-3xl">
                    {copy.title}
                  </h2>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)] hover:underline"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* =============================== CTA BAND =============================== */
export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--slot4-panel-bg)]">
      {/* Accent glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,rgba(138,118,80,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--slot4-accent),transparent)]" />
      <div className={`relative flex flex-col items-center gap-6 py-16 text-center sm:py-20 ${container}`}>
        <span className="rounded-full border border-[var(--slot4-accent)]/40 bg-[var(--slot4-accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
          {pagesContent.home.cta.badge}
        </span>
        <h2 className="editable-display max-w-2xl text-3xl font-extrabold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-xl text-base text-[var(--slot4-muted-text)] sm:text-lg">
          {pagesContent.home.cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={pagesContent.home.cta.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-8 py-3.5 text-sm font-bold text-[var(--slot4-on-accent)] shadow-[0_8px_28px_rgba(138,118,80,0.40)] transition hover:brightness-110"
          >
            {pagesContent.home.cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={pagesContent.home.cta.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-8 py-3.5 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-accent)]"
          >
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
