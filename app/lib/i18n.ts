import { defineI18n } from 'fumadocs-core/i18n'
import { defineI18nUI } from 'fumadocs-ui/i18n'

export const i18n = defineI18n({
  defaultLanguage: 'zh-CN',
  languages: ['zh-CN'],
})

export const i18nUI = defineI18nUI(i18n, {
  'zh-CN': {
    displayName: '简体中文',
    search: '搜索',
    searchNoResult: '未找到结果',
    toc: '本页目录',
    tocNoHeadings: '暂无标题',
    lastUpdate: '最后更新于',
    chooseLanguage: '选择语言',
    nextPage: '下一页',
    previousPage: '上一页',
    chooseTheme: '主题',
    editOnGithub: '在 GitHub 上编辑',
  },
})
