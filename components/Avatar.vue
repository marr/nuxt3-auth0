<template>
  <img
    :alt="user.name"
    :src="user.picture"
    class="rounded-full h-64 w-64"
  />
</template>
<script setup lang="ts">
  const user = useUser();
</script>