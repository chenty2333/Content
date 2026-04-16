import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  DocsBody,
  DocsPage,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/docs/page'
import { getPageMarkdownUrl, source } from '@/lib/source'
import { useMDXComponents } from '@/components/mdx'
import { DocAuthors } from '@/components/doc-authors'
import {
  LabNoteFloatingButton,
  LabNoteProvider,
} from '@/components/page-lab-note'

type DocsPageProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: DocsPageProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) notFound()

  const Mdx = page.data.body

  return (
    <LabNoteProvider key={page.path}>
      <DocsPage toc={page.data.toc} tableOfContent={{ style: 'clerk' }}>
        <h1 className="text-[1.75em] font-semibold">{page.data.title}</h1>
        <p className="mb-2 text-lg text-fd-muted-foreground">
          {page.data.description}
        </p>
        <div className="mb-4 flex flex-row flex-wrap items-center gap-2 border-b border-fd-border pb-4">
          <MarkdownCopyButton markdownUrl={getPageMarkdownUrl(page)}>
            复制全文
          </MarkdownCopyButton>
          <DocAuthors authors={page.data.author} />
        </div>
        <DocsBody>
          <Mdx components={useMDXComponents()} />
        </DocsBody>
      </DocsPage>
      <LabNoteFloatingButton />
    </LabNoteProvider>
  )
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    return {
      title: '页面未找到',
    }
  }

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export function generateStaticParams() {
  return source.generateParams()
}
