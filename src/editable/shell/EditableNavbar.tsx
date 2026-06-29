'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, PlusCircle, LogIn, X, UserPlus, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const HIDDEN_TASK_KEYS = ['listing', 'image']
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && !HIDDEN_TASK_KEYS.includes(task.key)).slice(0, 4).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const allNavItems = [
    { label: 'Home', href: '/' },
    ...navItems,
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/98 backdrop-blur-md">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3 pr-4">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)] transition group-hover:border-[var(--slot4-accent)]/60">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[200px] truncate text-[1.1rem] font-bold leading-none tracking-[-0.01em] text-[var(--editable-nav-text)]">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-0.5 block max-w-[200px] truncate text-[10px] font-medium text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden flex-1 items-center gap-0.5 lg:flex">
          {allNavItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1 rounded-lg px-4 py-2 text-[13px] font-semibold transition duration-200 ${
                  active
                    ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--editable-nav-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2 text-[13px] font-bold text-[var(--editable-cta-text)] transition duration-200 hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" />
                Add Listing
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 rounded-lg border border-[var(--editable-border)] px-4 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition duration-200 hover:border-[var(--slot4-accent)]/40 hover:text-[var(--editable-nav-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-lg border border-[var(--editable-border)] px-4 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition duration-200 hover:border-[var(--slot4-accent)]/40 hover:text-[var(--editable-nav-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-5 py-2 text-[13px] font-bold text-[var(--editable-cta-text)] transition duration-200 hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" />
                Add Your Listing
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 transition hover:border-[var(--slot4-accent)]/40 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <div className="grid gap-1">
            {[...allNavItems, ...(session ? [{ label: 'Create Listing', href: '/create' }] : [{ label: 'Sign Up', href: '/signup' }])].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-[13px] font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)] hover:text-[var(--editable-nav-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-lg px-4 py-3 text-left text-[13px] font-semibold text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)]">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-[13px] font-semibold text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)]">
                Sign In
              </Link>
            )}
          </div>
          <div className="mt-4">
            <Link href="/create" onClick={() => setOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] py-3 text-[13px] font-bold text-[var(--editable-cta-text)]">
              <PlusCircle className="h-4 w-4" /> Add Your Listing
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
