import { loader, type PageTreeBuilderContext } from 'fumadocs-core/source'
import type { Folder, Root } from 'fumadocs-core/page-tree'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { docs } from 'collections/server'
import { docsContentRoute, docsRoute } from './shared'

function getMetaColor(
  storage: PageTreeBuilderContext['storage'],
  metaPath: string | undefined,
) {
  if (!metaPath) return undefined

  const file = storage.read(metaPath)
  if (!file || file.format !== 'meta') return undefined

  const color = Reflect.get(file.data as object, 'color')
  return typeof color === 'string' ? color : undefined
}

function docsColorPlugin() {
  return {
    name: 'docs:meta-color',
    transformPageTree: {
      folder(
        this: Pick<PageTreeBuilderContext, 'storage'>,
        node: Folder,
        _folderPath: string,
        metaPath?: string,
      ): Folder {
        const color = getMetaColor(this.storage, metaPath)
        if (!color) return node

        Reflect.set(node as object, 'color', color)
        return node
      },
      root(
        this: Pick<PageTreeBuilderContext, 'storage'>,
        node: Root,
      ): Root {
        const ref = Reflect.get(node, '$ref')
        const color =
          typeof ref === 'string' ? getMetaColor(this.storage, ref) : undefined
        if (!color) return node

        Reflect.set(node as object, 'color', color)
        return node
      },
    },
  }
}

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
  plugins: [lucideIconsPlugin(), docsColorPlugin()],
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
