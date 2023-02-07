<template>
  You are {{ user.name }}
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'logged-in'
})
const user = useUser();
</script>