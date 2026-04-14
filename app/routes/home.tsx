import type { Route } from './+types/home'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { Link } from 'react-router'
import { baseOptions } from '@/lib/layout.shared'
import { appName } from '@/lib/shared'

export function meta({}: Route.MetaArgs) {
  return [
    { title: appName },
    {
      name: 'description',
      content: '杭州师范大学操作系统实验课程文档与课程资料。',
    },
  ]
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
            课程文档
          </p>
          <h1 className="text-3xl font-semibold text-fd-foreground sm:text-4xl">
            {appName}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-fd-muted-foreground">
            一个简洁的课程文档站点，用于承载课程笔记、实验指南和实验讲义。
            我们已经移除了模板里多余的演示功能与导出入口，让项目更专注于
            内容本身。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center rounded-md border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            to="/docs/os-2026-spring"
          >
            浏览文档
          </Link>
          <Link
            className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            to="/docs/os-2026-spring/workflow"
          >
            查看维护流程
          </Link>
        </div>
      </main>
    </HomeLayout>
  )
}
