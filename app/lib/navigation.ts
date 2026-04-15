import { findPath, type Folder, type Root } from 'fumadocs-core/page-tree'
import type { ColorScheme } from './source'

type ColoredNode = (Folder | Root) & { color?: ColorScheme }

export function getNodeColor(node: Folder | Root | undefined) {
  return (node as ColoredNode | undefined)?.color
}

export function getPageColor(tree: Root, url: string | undefined) {
  if (!url) return getNodeColor(tree)

  const path =
    findPath(
      tree.children,
      (node) => node.type === 'page' && node.url === url,
    ) ?? []

  for (let index = path.length - 1; index >= 0; index -= 1) {
    const node = path[index]
    if (node.type !== 'folder') continue

    const color = getNodeColor(node)
    if (color) return color
  }

  return getNodeColor(tree)
}
