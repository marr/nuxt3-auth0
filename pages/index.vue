<script setup lang="ts">
definePageMeta({
  auth: true
});
</script>
<template>
  <div>
    <h3>
      You're in!
    </h3>
    <p style="white-space: pre;">{{ $auth.session }}</p>
    <NuxtLink to="/logout">Logout</NuxtLink>
  </div>
</template>