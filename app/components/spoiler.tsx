import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SpoilerProps = {
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>

export function Spoiler({ children, className, ...props }: SpoilerProps) {
  return (
    <span
      tabIndex={0}
      className={[
        'group relative isolate inline-block align-baseline text-inherit focus-visible:outline-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="relative z-0 inline-block px-[0.08em] text-transparent transition-colors duration-150 ease-out group-hover:text-inherit group-focus-visible:text-inherit">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[0.18em] bottom-[0.16em] z-[1] rounded-[0.16em] bg-current transition-opacity duration-150 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
      />
    </span>
  )
}
