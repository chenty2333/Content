import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content',
  docs: {
    schema: frontmatterSchema.extend({
      author: z.union([z.string(), z.array(z.string())]).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema.safeExtend({
      color: z.string().optional(),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    providerImportSource: '@/components/mdx',
  },
})
