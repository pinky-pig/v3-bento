<template>
  <br>
  <h2>Demo</h2>

  <CodePreview>
    <template #preview>
      <Suspense>
        <DefaultComponent />
      </Suspense>
    </template>

    <template #code>
      <Suspense>
        <DefaultCode />
      </Suspense>
    </template>
  </CodePreview>
</template>
