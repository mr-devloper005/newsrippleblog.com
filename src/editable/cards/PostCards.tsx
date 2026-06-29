import Link from 'next/link'
import { ArrowRight, Clock3, MapPin, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* =================== FEATURED CARD (large hero-style) =================== */
export function EditorialFeatureCard({ post, href, label = 'Featured listing' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden rounded-2xl ${dc.motion.lift}`}>
      <div className="relative min-h-[480px] overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)] sm:min-h-[560px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(8,7,4,0.88)_75%,rgba(8,7,4,0.96)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[440px] flex-col justify-end p-6 sm:p-8">
          <span className="inline-flex w-fit rounded-full border border-[var(--slot4-accent)]/40 bg-[var(--slot4-accent-soft)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
            {label}
          </span>
          <h3 className="editable-display mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-2 text-sm leading-7 text-white/70">{getEditableExcerpt(post, 160)}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-bold text-[var(--slot4-on-accent)]">
            View Details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* =================== RAIL CARD (horizontal scroll rail) =================== */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_8px_32px_rgba(138,118,80,0.18)]`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-3 line-clamp-2 text-lg font-extrabold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)]">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--slot4-accent)]">
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

/* =================== COMPACT INDEX CARD (numbered list) =================== */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 gap-4 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 transition duration-300 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_4px_20px_rgba(138,118,80,0.14)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-xs font-extrabold text-[var(--slot4-accent)]">
        {index + 1}
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
          <Clock3 className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
          {getEditableCategory(post)}
        </p>
        <h3 className="editable-display mt-1.5 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

/* =================== ARTICLE LIST CARD (horizontal) =================== */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group grid min-w-0 gap-5 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 transition duration-300 hover:border-[var(--slot4-accent)]/30 hover:shadow-[0_8px_32px_rgba(138,118,80,0.16)] sm:grid-cols-[220px_minmax(0,1fr)]`}
    >
      <div className="relative aspect-[16/12] overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[180px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="min-w-0 py-2 sm:py-4 sm:pr-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          No. {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="editable-display mt-3 line-clamp-2 text-xl font-extrabold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]">
          View Details <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
