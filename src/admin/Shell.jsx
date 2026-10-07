import { useState } from 'react'
import {
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  MessageSquare,
  Navigation,
  PenLine,
  Settings as SettingsIcon,
  Briefcase,
  Users,
  X,
} from 'lucide-react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router'
import Logo from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { useAuth } from './auth'
import { Loading } from './ui'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Leads', icon: Inbox },
  { to: '/admin/chats', label: 'Chats', icon: MessageSquare },
  { to: '/admin/posts', label: 'Blog', icon: FileText },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/projects', label: 'Portfolio', icon: Briefcase },
  { to: '/admin/texts', label: 'Page text', icon: PenLine },
  { to: '/admin/menu', label: 'Menu', icon: Navigation },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

function SidebarLink({ item, onNavigate }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 font-display text-sm font-semibold transition-colors',
          isActive ? 'bg-primary text-primary-fg shadow-button' : 'text-fg-muted hover:bg-surface-overlay hover:text-fg',
        )
      }
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {item.label}
    </NavLink>
  )
}

// Signed-in admin chrome: dark sidebar on desktop, slide-down menu on mobile. Unauthenticated
// visitors are sent to /admin/login.
export default function Shell() {
  const { user, loading, unavailable, logout } = useAuth()
  const { pathname } = useLocation()
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === pathname

  if (loading) return <Loading label="Checking your session…" />
  if (!user) return <Navigate to="/admin/login" replace state={{ unavailable }} />

  const sidebar = (
    <>
      <div className="px-3 pt-1 pb-5">
        <Logo />
        <p className="mt-3 font-display text-[11px] font-bold tracking-[0.2em] text-fg-subtle uppercase">Admin</p>
      </div>
      <nav aria-label="Admin" className="flex flex-col gap-1">
        {nav.map((item) => (
          <SidebarLink key={item.to} item={item} onNavigate={() => setOpenAt(null)} />
        ))}
      </nav>
      <div className="mt-auto space-y-2 border-t border-line pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 font-display text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-overlay hover:text-fg"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          View website
        </a>
        <div className="px-3 text-xs text-fg-subtle">
          <p className="truncate font-semibold text-fg-muted">{user.name}</p>
          <p className="truncate">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-display text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-overlay hover:text-fg"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-dvh bg-surface-muted lg:grid lg:grid-cols-[16.5rem_1fr]">
      <aside data-tone="inverse" className="sticky top-0 hidden h-dvh flex-col bg-surface p-4 text-fg lg:flex">
        {sidebar}
      </aside>

      <header data-tone="inverse" className="sticky top-0 z-30 flex items-center justify-between bg-surface px-4 py-3 text-fg lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-overlay"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <MenuIcon className="size-5" aria-hidden="true" />}
        </button>
      </header>
      {open && (
        <div data-tone="inverse" className="fixed inset-x-0 top-[3.75rem] bottom-0 z-30 flex flex-col overflow-y-auto bg-surface p-4 text-fg lg:hidden">
          {sidebar}
        </div>
      )}

      <main id="main" className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
