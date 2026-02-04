<script setup lang="ts">
defineOptions({
  name: 'GlobalFooter'
})
</script>

<template>
  <DarkModeContainer class="h-full flex-center flex-col sm:flex-row">
    <span>Copyright © {{ new Date().getFullYear() }} DILANO 迪兰诺</span>
    <a
      class="mt-2 font-extrabold sm:ml-4 sm:mt-0 hover:underline"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
    >
      沪ICP备2025138553号-2
    </a>
  </DarkModeContainer>
</template>

<style scoped></style>
