import { findPath, type Folder, type Root } from 'fumadocs-core/page-tree'

export function getNodeColor(node: Folder | Root | undefined) {
  if (!node) return undefined

  const color = Reflect.get(node as object, 'color')
  return typeof color === 'string' ? color : undefined
}

export function getPageColor(tree: Root, url: string | undefined) {
  if (!url) return getNodeColor(tree)

  const path =
    findPath(tree.children, (node) => node.type === 'page' && node.url === url) ??
    []

  for (let index = path.length - 1; index >= 0; index -= 1) {
    const node = path[index]
    if (node.type !== 'folder') continue

    const color = getNodeColor(node)
    if (color) return color
  }

  return getNodeColor(tree)
}
