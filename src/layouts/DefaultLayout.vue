<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
</script>
<template>
  <div class="flex flex-col space-y-2 md:space-y-4">
    <header>
      <slot name="header"><the-navbar /></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer class="text-center">
      <slot name="footer">Jobboard</slot>
    </footer>
  </div>
</template>
