<template>
  You are {{ user?.name || 'exposed'}}
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'logged-in'
})
const user = useUser();
</script>