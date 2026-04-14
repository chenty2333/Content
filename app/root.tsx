import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { RootProvider } from 'fumadocs-ui/provider/react-router'
import type { Route } from './+types/root'
import './app.css'
import NotFound from './routes/not-found'
import { i18nUI } from '@/lib/i18n'

export const links: Route.LinksFunction = () => []

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nUI.provider('zh-CN')}>{children}</RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = '出错了'
  let details = '发生了未预期的错误。'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <NotFound />
    message = '错误'
    details = error.statusText
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 w-full max-w-[1400px] mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
