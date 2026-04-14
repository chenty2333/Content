import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { siteName, githubUrl } from './shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: siteName,
    },
    githubUrl,
  }
}
