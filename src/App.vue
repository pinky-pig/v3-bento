<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />
  </main>
  <Toaster
    position="top-center"
    :expand="false"
    :rich-colors="false"
    :close-button="false"
  />
</template>
