<script setup lang="ts">
import { toast } from 'vue-sonner'

const code = `<!-- Usage.vue -->
<Bento
  :bentoCells="bentoCells"
  class="!h-[610px] overflow-y-auto overflow-x-hidden p-[10px] box-content"
  :size="140"
  :disabled="false"
  :gap="10"
  :maximum-cells="4"
  @drag-end="(e: any) => console.log(e)"
  @drag-start="(e: any) => console.log(e)"
>
  <BentoItem 
    v-for="item in bentoCells" 
    :key="item.id" 
    :id="item.id" 
    :x="item.x" 
    :y="item.y" 
    :width="item.width" 
    :height="item.height"
  >
    <Cell :url="'./' + item.id + '.svg'" :bg="'#fff'" />
  </BentoItem>
</Bento>
`
const showCheckIcon = ref(false)

const handleCopyCode = async () => {
  await useCopyCode({ code, checkIconRef: showCheckIcon })
  toast('Copied to your clipboard!!!')
}
</script>

<template>
  <br>
  <br>
  <h2>Usage</h2>
  <h3>Wrap the child component to be dragged with the Bento and BentoItem components.</h3>
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
