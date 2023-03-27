import { defineConfig } from 'vitepress'
import guide from './sidebar_conf/guide.js'

export default defineConfig({
  // base: '/guide/', // 二级路由
  appearance: true, // 是否启用黑暗模式
  title: 'V3-Dragblock', // 所有文档的浏览器标签title
  description: 'Vue3 版本的一个拖拽组件', // 会渲染成<meta>标签，SEO用
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', crossorigin: '' }],
  ],

  themeConfig: {
    siteTitle: 'V3-Dragblock',
    logo: { light: '/logo.svg', dark: '/logo.svg' },
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true, // 启动页面丝滑滚动
    nav: [
      { text: 'Guide', link: '/about/', activeMatch: '/about/' },
      { text: 'Sample', link: 'https://v3-dragblock-demo.vercel.app/' },
      { text: 'Playground', link: 'https://play.vueuse.org/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinky-pig' },
    ],
    sidebar: {
      '/guide/': guide,
      '/develop/': guide,
      // '/project/': project,
    },
    // algolia: {
    //   appId: 'L9KMDUKCGI',
    //   apiKey: 'ab27f8eec3147ace8f540b92e68504c7',
    //   indexName: 'pinky-pig',
    //   // searchParameters: {
    //   //     facetFilters: ['tags:guide,api']
    //   // }
    // },

  },
})
