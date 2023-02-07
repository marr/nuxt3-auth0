<template>
  <nav class="flex align-center gap-4 p-4">
    <NLink to="/">Home</NLink>
    <NLink to="/about">About (protected)</NLink>
    <NLink v-if="user" external to="/logout">Logout</NLink>
    <NLink v-else external to="/login">Login</NLink>
  </nav>
</template>
<script setup lang="ts">
const user = useUser();
</script>
