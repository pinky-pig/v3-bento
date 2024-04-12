<script setup lang="ts" generic="T extends any, O extends any">
import { Card, CardContent,} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'

defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-center px-4 py-10">
    <div class="i-lucide-airplay text-4xl inline-block mb-4" />

    <p>
      <a rel="noreferrer" href="https://github.com/pinky-pig/vue-starter-lite" target="_blank">
        Vue Starter Lite
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">Arvin's Simple Vite Starter Template</em>
    </p>

    <div class="py-4" />


    <Tabs default-value="default" class="w-[800px]">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="default">
          Default
        </TabsTrigger>
        <TabsTrigger value="empty">
          Slot
        </TabsTrigger>
        <TabsTrigger value="empty">
          数据定义
        </TabsTrigger>
      </TabsList>
      <TabsContent value="default">
        <Card>
          <CardContent class="space-y-2">
            <Default />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="empty">
        <Card>
          <CardContent class="space-y-2">
            <Custom />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>


    <TheFooter></TheFooter>
  </div>
</template>
