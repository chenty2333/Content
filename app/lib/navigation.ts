export function getDocsSection(path: string | undefined) {
  if (!path) return undefined

  const [section] = path.split('/', 1)
  return section || undefined
}

export function getSectionColor(section: string | undefined) {
  switch (section) {
    case 'os-2026-spring':
      return 'var(--os-2026-spring-color)'
    default:
      return 'var(--color-fd-foreground)'
  }
}
