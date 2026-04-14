import type { Route } from './+types/docs'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsPage,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/docs/page'
import { getPageMarkdownUrl, source } from '@/lib/source'
import browserCollections from 'collections/browser'
import { baseOptions } from '@/lib/layout.shared'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { useMDXComponents } from '@/components/mdx'

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0)
  const page = source.getPage(slugs)
  if (!page) throw new Response('Not found', { status: 404 })

  return {
    path: page.path,
    markdownUrl: getPageMarkdownUrl(page).url,
    pageTree: await source.serializePageTree(source.getPageTree()),
  }
}

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: Mdx },
    { markdownUrl }: { markdownUrl: string },
  ) {
    return (
      <DocsPage toc={toc} tableOfContent={{ style: 'clerk' }}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <h1 className="text-[1.75em] font-semibold">{frontmatter.title}</h1>
        <p className="text-lg text-fd-muted-foreground mb-2">
          {frontmatter.description}
        </p>
        <div className="mb-6 flex flex-row items-center gap-2 border-b border-fd-border pb-4">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
        </div>
        <DocsBody>
          <Mdx components={useMDXComponents()} />
        </DocsBody>
      </DocsPage>
    )
  },
})

export default function Page({ loaderData }: Route.ComponentProps) {
  const { path, pageTree, markdownUrl } = useFumadocsLoader(loaderData)

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      {clientLoader.useContent(path, { markdownUrl })}
    </DocsLayout>
  )
}
