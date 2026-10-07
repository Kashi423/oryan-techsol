import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink, Plus, Save, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import { api } from '@/lib/cms/api'
import BlockEditor, { fromForm, toForm } from './BlockEditor'
import ImageField from './ImageField'
import {
  btn, confirmAction, EmptyState, ErrorNote, formatDay, inputClass, Labeled, Loading, PageHeader, Panel, Pill, useApi, useToast,
} from './ui'

export function PostsList() {
  const { data, error, loading, reload } = useApi('/admin/posts')
  return (
    <>
      <PageHeader
        title="Blog"
        description="Write and publish articles. Published articles appear on the website straight away."
        actions={
          <Link to="/admin/posts/new" className={btn.primary}>
            <Plus className="size-4" aria-hidden="true" />
            New article
          </Link>
        }
      />
      <Panel padded={false}>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="p-5"><ErrorNote error={error} onRetry={reload} /></div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No articles yet">Create your first article, or import the starter content from the dashboard.</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {data.items.map((post) => (
              <li key={post.id}>
                <Link to={`/admin/posts/${post.id}`} className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-muted">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-fg normal-case">{post.title}</p>
                    <p className="text-xs text-fg-subtle">/blog/{post.slug} · {post.category || 'No category'}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Pill tone={post.status}>{post.status}</Pill>
                    <span className="text-[11px] text-fg-subtle">{post.status === 'published' ? formatDay(post.publishedAt) : `Edited ${formatDay(post.updatedAt)}`}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  )
}

const blank = () => ({
  title: '', slug: '', status: 'draft', publishDate: '', category: '', shortTitle: '', description: '', keywords: '',
  serviceLabel: '', serviceTo: '/contact', intro: '', takeaways: '', image: '', faqs: [], related: [], blocks: [],
})

function fromPost(post) {
  return {
    title: post.title, slug: post.slug, status: post.status, publishDate: (post.publishedAt ?? '').slice(0, 10),
    category: post.category, shortTitle: post.shortTitle === post.title ? '' : post.shortTitle, description: post.description,
    keywords: post.keywords, serviceLabel: post.service?.label ?? '', serviceTo: post.service?.to ?? '/contact',
    intro: post.intro, takeaways: (post.takeaways ?? []).join('\n'), image: post.image ?? '',
    faqs: post.faqs ?? [], related: post.related ?? [], blocks: (post.blocks ?? []).map(toForm),
  }
}

function toPayload(form) {
  return {
    ...form,
    takeaways: form.takeaways.split('\n').map((l) => l.trim()).filter(Boolean),
    blocks: form.blocks.map(fromForm),
  }
}

function Editor({ post, others }) {
  const navigate = useNavigate()
  const toast = useToast()
  const isNew = !post
  const [form, setForm] = useState(() => (post ? fromPost(post) : blank()))
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [busy, setBusy] = useState(false)
  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const slugFromTitle = (title) => title.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120)
  const descLength = form.description.length

  async function save(statusOverride) {
    setBusy(true)
    try {
      const payload = toPayload({ ...form, status: statusOverride ?? form.status })
      const saved = isNew
        ? await api('/admin/posts', { method: 'POST', body: payload })
        : await api(`/admin/posts/${post.id}`, { method: 'PUT', body: payload })
      toast(saved.status === 'published' ? 'Saved and published.' : 'Draft saved.')
      if (isNew) navigate(`/admin/posts/${saved.id}`, { replace: true })
      else setForm(fromPost(saved))
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    if (!confirmAction(`Delete "${form.title}"? This can't be undone.`)) return
    try {
      await api(`/admin/posts/${post.id}`, { method: 'DELETE' })
      toast('Article deleted.')
      navigate('/admin/posts')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const relatedChoices = others.filter((p) => p.slug !== form.slug)

  return (
    <>
      <Link to="/admin/posts" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All articles
      </Link>
      <PageHeader
        title={isNew ? 'New article' : 'Edit article'}
        actions={
          <>
            {!isNew && form.status === 'published' && (
              <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className={btn.secondary}>
                <ExternalLink className="size-4" aria-hidden="true" />
                View on site
              </a>
            )}
            <button type="button" className={btn.secondary} disabled={busy} onClick={() => save('draft')}>
              <Save className="size-4" aria-hidden="true" />
              Save as draft
            </button>
            <button type="button" className={btn.primary} disabled={busy || !form.title.trim()} onClick={() => save('published')}>
              {busy ? 'Saving…' : form.status === 'published' ? 'Save & keep published' : 'Publish'}
            </button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Panel title="Article">
            <div className="space-y-4">
              <Labeled label="Title">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugFromTitle(e.target.value) }) })}
                  className={`${inputClass} !text-lg font-semibold`}
                  placeholder="How to… / What is… / The complete guide to…"
                />
              </Labeled>
              <Labeled label="Introduction" hint="The opening paragraph, shown above the key takeaways. Links and **bold** work here too.">
                <textarea rows={5} value={form.intro} onChange={(e) => set({ intro: e.target.value })} className={inputClass} />
              </Labeled>
              <Labeled label="Key takeaways" hint="One per line (3–5 works best). Shown in a highlighted box.">
                <textarea rows={5} value={form.takeaways} onChange={(e) => set({ takeaways: e.target.value })} className={inputClass} />
              </Labeled>
            </div>
          </Panel>

          <Panel title="Body">
            <BlockEditor blocks={form.blocks} onChange={(blocks) => set({ blocks })} />
          </Panel>

          <Panel
            title="FAQs"
            actions={<button type="button" className={btn.small} onClick={() => set({ faqs: [...form.faqs, { question: '', answer: '' }] })}><Plus className="size-3.5" />Add question</button>}
          >
            <p className="mb-3 text-xs text-fg-subtle">Shown at the end of the article and sent to Google as FAQ rich results.</p>
            <div className="space-y-3">
              {form.faqs.map((faq, i) => (
                <div key={i} className="space-y-2 rounded-xl border border-line bg-surface p-3">
                  <input type="text" value={faq.question} onChange={(e) => set({ faqs: form.faqs.map((f, j) => (j === i ? { ...f, question: e.target.value } : f)) })} placeholder="Question" className={inputClass} />
                  <textarea rows={3} value={faq.answer} onChange={(e) => set({ faqs: form.faqs.map((f, j) => (j === i ? { ...f, answer: e.target.value } : f)) })} placeholder="Answer" className={inputClass} />
                  <button type="button" className={btn.small} onClick={() => set({ faqs: form.faqs.filter((_, j) => j !== i) })}><Trash2 className="size-3.5" />Remove</button>
                </div>
              ))}
              {form.faqs.length === 0 && <p className="text-sm text-fg-muted">No questions yet.</p>}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Publishing">
            <div className="space-y-4">
              <Labeled label="Status">
                <select value={form.status} onChange={(e) => set({ status: e.target.value })} className={inputClass}>
                  <option value="draft">Draft (not on the website)</option>
                  <option value="published">Published</option>
                </select>
              </Labeled>
              <Labeled label="Publish date" hint="Leave empty to use today's date when first published.">
                <input type="date" value={form.publishDate} onChange={(e) => set({ publishDate: e.target.value })} className={inputClass} />
              </Labeled>
              {!isNew && (
                <button type="button" className={`${btn.danger} w-full`} onClick={remove}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete article
                </button>
              )}
            </div>
          </Panel>

          <Panel title="Search & sharing (SEO)">
            <div className="space-y-4">
              <Labeled label="URL slug" hint={`oryantechsol.com/blog/${form.slug || '…'}`}>
                <input type="text" value={form.slug} onChange={(e) => { setSlugTouched(true); set({ slug: e.target.value.toLowerCase() }) }} className={inputClass} />
              </Labeled>
              <Labeled label="Meta description" hint={`${descLength}/160 — what Google shows under the title.`}>
                <textarea rows={3} value={form.description} onChange={(e) => set({ description: e.target.value })} className={`${inputClass} ${descLength > 160 ? 'border-danger' : ''}`} />
              </Labeled>
              <Labeled label="Keywords" hint="Comma-separated."><input type="text" value={form.keywords} onChange={(e) => set({ keywords: e.target.value })} className={inputClass} /></Labeled>
              <Labeled label="Short title" hint="Used in breadcrumbs. Optional."><input type="text" value={form.shortTitle} onChange={(e) => set({ shortTitle: e.target.value })} className={inputClass} /></Labeled>
              <ImageField label="Social share image" value={form.image} onChange={(image) => set({ image })} shape="wide" hint="1200×630 works best. Leave empty to use the auto-generated card." />
            </div>
          </Panel>

          <Panel title="Organisation">
            <div className="space-y-4">
              <Labeled label="Category"><input type="text" value={form.category} onChange={(e) => set({ category: e.target.value })} placeholder="App Development" className={inputClass} /></Labeled>
              <Labeled label="Related service name"><input type="text" value={form.serviceLabel} onChange={(e) => set({ serviceLabel: e.target.value })} placeholder="Mobile app development services" className={inputClass} /></Labeled>
              <Labeled label="Related service link"><input type="text" value={form.serviceTo} onChange={(e) => set({ serviceTo: e.target.value })} placeholder="/app-development" className={inputClass} /></Labeled>
              <fieldset>
                <legend className="mb-1.5 font-display text-xs font-bold text-fg">"Keep reading" articles</legend>
                <div className="max-h-48 space-y-1.5 overflow-y-auto rounded-lg border border-line p-2">
                  {relatedChoices.length === 0 && <p className="p-1 text-xs text-fg-subtle">No other articles yet.</p>}
                  {relatedChoices.map((p) => (
                    <label key={p.slug} className="flex items-start gap-2 text-sm text-fg-muted">
                      <input
                        type="checkbox"
                        checked={form.related.includes(p.slug)}
                        onChange={(e) => set({ related: e.target.checked ? [...form.related, p.slug].slice(0, 6) : form.related.filter((s) => s !== p.slug) })}
                        className="mt-1 size-4 accent-[var(--color-highlight)]"
                      />
                      <span>{p.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}

export function PostEditor() {
  const { id } = useParams()
  const isNew = id === 'new'
  const { data: post, error, loading, reload } = useApi(isNew ? null : `/admin/posts/${id}`)
  const { data: list } = useApi('/admin/posts')
  const others = useMemo(() => list?.items ?? [], [list])

  if (!isNew && loading) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />
  return <Editor key={post?.id ?? 'new'} post={isNew ? null : post} others={others} />
}
