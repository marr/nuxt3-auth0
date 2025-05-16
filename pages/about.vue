<script setup lang="ts">
  const user = useUser();
</script>
<template>
  You are {{ user?.name || 'exposed'}}
</template>