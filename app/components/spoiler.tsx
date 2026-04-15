'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'

type SpoilerProps = {
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>

export function Spoiler({ children, className, ...props }: SpoilerProps) {
  const [revealed, setRevealed] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!revealed) return

    function hide() {
      setRevealed(false)
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (rootRef.current?.contains(target)) return

      hide()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    window.addEventListener('scroll', hide, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      window.removeEventListener('scroll', hide, true)
    }
  }, [revealed])

  return (
    <span
      ref={rootRef}
      tabIndex={0}
      data-revealed={revealed ? '' : undefined}
      className={[
        'group box-decoration-clone inline rounded-[0.16em] bg-current px-[0.08em] align-baseline text-inherit transition-colors duration-150 ease-out hover:bg-transparent focus-visible:bg-transparent focus-visible:outline-none data-[revealed]:bg-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerDown={(event) => {
        if (event.pointerType !== 'touch') return
        setRevealed((value) => !value)
      }}
      {...props}
    >
      <span className="text-transparent transition-colors duration-150 ease-out group-hover:text-inherit group-focus-visible:text-inherit group-data-[revealed]:text-inherit">
        {children}
      </span>
    </span>
  )
}
