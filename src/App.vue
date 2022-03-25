<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
const auth = useAuthStore();
onMounted(async () => {
  try {
    const login = await auth.initAuth();
    if (login) {
      console.log("Logged in");
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="container mx-auto px-4 md:px-8">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
