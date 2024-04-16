<script setup lang="ts">
import { getHighlighter } from 'shiki'

// 所有的主题：import { bundledThemes } from 'shiki'
// 支持的语言：import { bundledLanguages } from 'shiki'

const props = withDefaults(defineProps<{
  code: string
  // 代码语言类型
  lang?: string
  // 浅色主题
  theme?: string
  // 深色主题
  darkTheme?: string
}>(), {
  lang: 'javascript',
  theme: 'github-light',
  darkTheme: 'slack-dark',
})

const highlighter = await getHighlighter({
  themes: [
    'github-light',
    'vitesse-light',

    // 黑色主题
    'vitesse-dark',
    'nord',
    'slack-dark',
    'tokyo-night',
    'one-dark-pro',
    'material-theme-ocean',
  ],
  langs: [
    'js',
    'javascript',
    'bash',
    'vue',
    'vue-html',
    'ts',
    'typescript',
    'tsx',
    'jsx',
    'json',
    'html',
    'css',
    'scss',
    'less',
    'json5',
    'yaml',
    'python',
  ],
})

const code = highlighter.codeToHtml(props.code, {
  lang: props.lang,
  themes: {
    light: 'vitesse-light',
    dark: 'nord',
  },
  defaultColor: 'light',
})
</script>

<template>
  <div v-html="code" />
</template>
