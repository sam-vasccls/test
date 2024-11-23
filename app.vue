<template>
  <Loading v-if="isLoading" />
  <NuxtPage />  
</template>

<script setup>
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const isLoading = computed(() => {
  return loadingStore.$isLoading
})

setTimeout(() => {
  loadingStore.setLoading(false)
}, 200)
</script>