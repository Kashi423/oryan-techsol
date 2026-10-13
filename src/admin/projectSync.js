// Works out what it takes to make the admin Portfolio match the site's template file
// (src/data/caseStudies.js). Pure functions so it can be tested without a browser or server.
//
// Order of operations when applied: create and update first, delete last, so a failure half-way
// never leaves the live portfolio empty.

/** Shape the admin API accepts for create / update. */
export function toApiBody(project) {
  return {
    title: project.title,
    slug: project.slug,
    category: project.category,
    industry: project.industry ?? '',
    solutionType: project.solutionType ?? '',
    problem: project.problem ?? '',
    solution: project.solution ?? '',
    technology: Array.isArray(project.technology) ? project.technology : [],
    result: project.result ?? '',
    platform: Array.isArray(project.platform) ? project.platform : [],
    features: Array.isArray(project.features) ? project.features : [],
    backend: project.backend ?? '',
    aiIntegration: project.aiIntegration ?? '',
    automation: project.automation ?? '',
    placeholder: Boolean(project.placeholder),
    status: 'published',
  }
}

/**
 * @param {Array<{id:number, slug:string, title:string}>} existing projects currently in the admin
 * @param {Array<object>} template projects from the site file
 */
export function planSync(existing, template) {
  const bySlug = new Map(existing.map((p) => [p.slug, p]))
  const wanted = new Set(template.map((p) => p.slug))
  const creates = []
  const updates = []
  for (const project of template) {
    const found = bySlug.get(project.slug)
    if (found) updates.push({ id: found.id, title: project.title, body: toApiBody(project) })
    else creates.push({ title: project.title, body: toApiBody(project) })
  }
  const deletes = existing.filter((p) => !wanted.has(p.slug)).map((p) => ({ id: p.id, title: p.title }))
  return { creates, updates, deletes }
}

/** One-line summary for the confirmation dialog. */
export function describePlan({ creates, updates, deletes }) {
  const parts = []
  if (creates.length) parts.push(`add ${creates.length}`)
  if (updates.length) parts.push(`update ${updates.length}`)
  if (deletes.length) parts.push(`remove ${deletes.length} (${deletes.map((d) => d.title).join(', ')})`)
  return parts.length ? parts.join(', ') : 'nothing to change'
}
