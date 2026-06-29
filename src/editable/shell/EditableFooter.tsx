'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const HIDDEN_TASK_KEYS = ['listing', 'image']
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && !HIDDEN_TASK_KEYS.includes(task.key))
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)]">
      {/* Top accent line */}
      <div className="h-[2px] bg-[linear-gradient(90deg,transparent_0%,var(--slot4-accent)_30%,var(--slot4-accent)_70%,transparent_100%)]" />

      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
              </span>
              <span className="editable-display text-lg font-bold tracking-[-0.01em] text-[var(--slot4-page-text)]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--slot4-muted-text)]">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2 text-xs font-bold text-[var(--editable-cta-text)] transition hover:brightness-110"
              >
                Add Your Listing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--editable-border)] px-4 py-2 text-xs font-semibold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/40 hover:text-[var(--slot4-page-text)]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Explore</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.slice(0, 6).map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
                  {task.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Company</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session
                  ? [['Add Listing', '/create']]
                  : [['Sign In', '/login'], ['Sign Up', '/signup']]
                ),
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
                >
                  {label}
                </Link>
              ))}
              {session ? (
                <button
                  type="button"
                  onClick={logout}
                  className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Connect</h3>
            <div className="mt-5 grid gap-3">
              <div className="flex items-start gap-2.5 text-sm font-medium text-[var(--slot4-muted-text)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <span>India &amp; Worldwide</span>
              </div>
              <Link
                href="/contact"
                className="flex items-start gap-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <span>Send a message</span>
              </Link>
              <Link
                href="/create"
                className="flex items-start gap-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <span>List your business</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--editable-border)] px-4 py-5">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 px-0 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[var(--slot4-muted-text)]">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs font-medium text-[var(--slot4-muted-text)]">
            {globalContent.footer?.bottomNote}
          </p>
        </div>
      </div>
    </footer>
  )
}
