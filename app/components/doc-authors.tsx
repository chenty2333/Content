'use client'

import { useEffect, useState } from 'react'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'

type AuthorsValue = string | string[] | undefined

type GithubUser = {
  login: string
  name: string | null
  avatar_url: string
}

function getGithubUser(username: string) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(async (response) => {
      if (!response.ok) return null
      const data = (await response.json()) as GithubUser
      return data
    })
    .catch(() => null)
}

function preloadImage(src: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image()

    image.onload = () => resolve(true)
    image.onerror = () => resolve(false)
    image.src = src
  })
}

function AuthorChip({ username }: { username: string }) {
  const avatarSrc = `https://github.com/${username}.png?size=40`
  const [displayName, setDisplayName] = useState(username)
  const [showAvatar, setShowAvatar] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    void Promise.allSettled([
      getGithubUser(username),
      preloadImage(avatarSrc),
    ]).then(([userResult, avatarResult]) => {
      if (cancelled) return

      const user =
        userResult.status === 'fulfilled' ? userResult.value : null
      const avatarLoaded =
        avatarResult.status === 'fulfilled' ? avatarResult.value : false

      setDisplayName(user?.name?.trim() || username)
      setShowAvatar(avatarLoaded)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [avatarSrc, username])

  if (!ready) return null

  return (
    <span
      className={buttonVariants({
        color: 'secondary',
        size: 'sm',
        className: 'overflow-hidden',
      })}
    >
      {showAvatar ? (
        <img
          src={avatarSrc}
          alt={`${username} avatar`}
          className="me-2 size-3.5 shrink-0 rounded-full"
          loading="lazy"
          decoding="async"
          width={14}
          height={14}
        />
      ) : null}
      <span className="truncate">
        {displayName} ({username})
      </span>
    </span>
  )
}

export function DocAuthors({ authors }: { authors: AuthorsValue }) {
  const items = Array.isArray(authors) ? authors : authors ? [authors] : []
  if (items.length === 0) return null

  return (
    <>
      {items.map((username) => (
        <AuthorChip key={username} username={username} />
      ))}
    </>
  )
}
