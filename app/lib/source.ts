import { loader } from 'fumadocs-core/source'
import { docs } from 'collections/server'
import { docsContentRoute, docsRoute } from './shared'

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
})

export function getPageMarkdownUrl(page: { slugs: string[] }) {
  const segments = [...page.slugs, 'content.md']

  return {
    url: `${docsContentRoute}/${segments.join('/')}`,
  }
}

export async function getPageMarkdown(page: {
  data: { title: string; getText: (type: 'processed') => Promise<string> }
  url: string
}) {
  const processed = await page.data.getText('processed')

  return `# ${page.data.title} (${page.url})

${processed}`
}
