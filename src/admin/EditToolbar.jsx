import { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutDashboard, PenLine, Save, Undo2, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { api, setCsrf } from '@/lib/cms/api'
import { commitTexts, previewTexts, refreshTree } from '@/lib/cms/store'
import { setEditing } from '@/lib/cms/translate'
import { setAdminFlag } from './auth'
import { btn } from './ui'

// On-site editing bar for signed-in admins. "Edit text" wraps every piece of visible text in a
// clickable span (see src/lib/cms/patch.js); clicking one opens the editor below. Changes are
// previewed live and only stored when you press "Save changes".

const keepSpacing = (original, next) => {
  const trimmed = original.trim()
  const start = original.indexOf(trimmed)
  return original.slice(0, start) + next.trim() + original.slice(start + trimmed.length)
}

export default function EditToolbar() {
  const { pathname } = useLocation()
  const [ready, setReady] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [pending, setPending] = useState(() => new Map())
  const [target, setTarget] = useState(null)
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const pendingRef = useRef(pending)
  pendingRef.current = pending

  // Confirm the session with the server (and pick up the CSRF token).
  useEffect(() => {
    let cancelled = false
    api('/admin/me')
      .then((data) => {
        if (cancelled) return
        if (data.authenticated) {
          setCsrf(data.csrf)
          setReady(true)
          if (new URLSearchParams(window.location.search).has('cms-edit')) turnOn()
        } else {
          setAdminFlag(false)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const turnOn = useCallback(() => {
    setEditing(true)
    document.body.classList.add('cms-editing')
    setEditMode(true)
    refreshTree()
  }, [])

  const turnOff = useCallback(() => {
    if (pendingRef.current.size > 0 && !window.confirm('Discard your unsaved text changes?')) return
    setEditing(false)
    document.body.classList.remove('cms-editing')
    setEditMode(false)
    setTarget(null)
    setPending(new Map())
    previewTexts(new Map())
  }, [])

  // While editing, intercept clicks on editable text (and stop links/buttons from firing).
  useEffect(() => {
    if (!editMode) return undefined
    const onClick = (event) => {
      if (event.target.closest?.('[data-cms-bar]')) return
      const el = event.target.closest?.('[data-cms-orig]')
      if (!el) return
      event.preventDefault()
      event.stopPropagation()
      const original = el.dataset.cmsOrig
      const count = [...document.querySelectorAll('[data-cms-orig]')].filter((node) => node.dataset.cmsOrig === original).length
      setTarget({ original, count })
      setValue(el.textContent ?? original)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [editMode])

  function apply(next) {
    const replacement = keepSpacing(target.original, next)
    const map = new Map(pending)
    map.set(target.original, replacement)
    setPending(map)
    previewTexts(map)
    setTarget(null)
  }

  function reset() {
    const map = new Map(pending)
    map.set(target.original, target.original)
    setPending(map)
    previewTexts(map)
    setTarget(null)
  }

  async function save() {
    setSaving(true)
    setNotice('')
    try {
      const items = [...pending].map(([original, replacement]) => ({ original, replacement, page: pathname }))
      await api('/admin/texts', { method: 'PUT', body: { items } })
      commitTexts(pending)
      setPending(new Map())
      setNotice(`Saved ${items.length} change${items.length === 1 ? '' : 's'}. Visitors see them now.`)
    } catch (err) {
      setNotice(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!ready) return null

  return (
    <div data-cms-bar data-tone="inverse" className="fixed bottom-4 left-4 z-[90] flex max-w-[calc(100vw-2rem)] flex-col items-start gap-2 text-fg">
      {target && (
        <div className="w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-surface p-4 shadow-card">
          <p className="font-display text-xs font-bold tracking-wide text-highlight uppercase">Edit text</p>
          <textarea
            ref={(node) => node?.focus()}
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 40)))}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line-strong bg-surface-raised px-3 py-2 text-sm text-fg"
            aria-label="New text"
          />
          <p className="mt-2 text-xs text-fg-subtle">
            Appears {target.count} time{target.count === 1 ? '' : 's'} on this page — and everywhere else this exact wording is used.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={btn.primary} onClick={() => apply(value)}>Apply</button>
            <button type="button" className={btn.secondary} onClick={reset}><Undo2 className="size-4" />Original</button>
            <button type="button" className={btn.secondary} onClick={() => setTarget(null)}>Cancel</button>
          </div>
        </div>
      )}
      {notice && <output className="block max-w-sm rounded-xl border border-line-strong bg-surface px-3 py-2 text-xs text-fg shadow-card">{notice}</output>}
      <div className="flex items-center gap-1.5 rounded-full border border-line-strong bg-surface p-1.5 shadow-card">
        <Link to="/admin" className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-display text-xs font-bold text-fg-muted hover:bg-surface-overlay hover:text-fg">
          <LayoutDashboard className="size-3.5" aria-hidden="true" />
          Admin
        </Link>
        {editMode ? (
          <>
            <button
              type="button"
              onClick={save}
              disabled={saving || pending.size === 0}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 font-display text-xs font-bold text-primary-fg disabled:opacity-50"
            >
              <Save className="size-3.5" aria-hidden="true" />
              {saving ? 'Saving…' : `Save changes${pending.size ? ` (${pending.size})` : ''}`}
            </button>
            <button type="button" onClick={turnOff} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-display text-xs font-bold text-fg-muted hover:bg-surface-overlay hover:text-fg">
              <X className="size-3.5" aria-hidden="true" />
              Done
            </button>
          </>
        ) : (
          <button type="button" onClick={turnOn} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 font-display text-xs font-bold text-primary-fg">
            <PenLine className="size-3.5" aria-hidden="true" />
            Edit text
          </button>
        )}
      </div>
    </div>
  )
}
