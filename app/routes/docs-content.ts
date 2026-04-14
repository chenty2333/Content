import type { Route } from './+types/docs-content'
import { getPageMarkdown, source } from '@/lib/source'

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((segment) => segment.length > 0)
  slugs.pop()

  const page = source.getPage(slugs)
  if (!page) throw new Response('Not found', { status: 404 })

  return new Response(await getPageMarkdown(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
