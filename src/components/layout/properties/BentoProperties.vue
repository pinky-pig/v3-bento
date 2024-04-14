<script setup lang="ts">
import { toast } from 'vue-sonner'

const code = `pnpm install v3-bento`
const showCheckIcon = ref(false)

const handleCopyCode = async () => {
  await useCopyCode({ code, checkIconRef: showCheckIcon })
  toast('Copied to your clipboard!!!')
}
</script>

<template>
  <h2>Bento Properties</h2>
  <div class="relative">
    <Suspense>
      <Code :code="code" :lang="'bash'" />
    </Suspense>

    <button 
      aria-label="Copy code" 
      title="Copy code" 
      class="absolute btn-border w-[26px] h-[26px] rounded-[5px] p-1 top-1 right-2 flex justify-center items-center border border-solid border-[#f3f3f3] dark:border-[#1e293b]"
      @click="handleCopyCode"
    >
      <div class="i-lucide-check text-[14px]" v-if="showCheckIcon"></div>
      <div class="i-lucide-copy text-[14px]" v-else></div>
    </button>
  </div>
</template>
