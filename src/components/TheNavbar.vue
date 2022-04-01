<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import md5 from "md5";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = useAuthStore();
const isLoggedIn = computed(() => auth.isLoggedIn);
const showDropdown = ref(false);

const logout = async function () {
  const hasLoggedOut = await auth.logout();
  if (hasLoggedOut) {
    showDropdown.value = false;
    router.push("/");
  } else {
    console.error("Failed to logout");
  }
};
</script>
<template>
  <div
    class="mx-auto flex justify-between border-t-4 border-indigo-500 px-2 py-10 xl:px-0"
  >
    <h2 class="text-2xl font-semibold text-indigo-500">
      <router-link to="/"> JOB Board </router-link>
    </h2>

    <nav v-if="isLoggedIn" class="flex items-center gap-4">
      <router-link class="text-base" to="/"> My posts </router-link>
      <router-link
        class="flex rounded-md bg-indigo-500 p-2 text-white"
        :to="{ name: 'jobs.create' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Post a job</span>
      </router-link>
      <div class="relative flex gap-1">
        <button
          @click="showDropdown = !showDropdown"
          class="group flex items-center justify-center rounded-full border border-indigo-500 p-2"
        >
          <img
            class="h-8 w-8 rounded-full transition duration-300 ease-in-out group-hover:scale-125"
            :src="`https://www.gravatar.com/avatar/${md5(
              auth.user.email
            )}?s=40`"
          />
        </button>

        <Transition name="fade">
          <div
            v-if="showDropdown"
            @click="showDropdown = false"
            ref="dropdownRef"
            class="absolute top-[100%] right-0 z-10 flex w-40 flex-col items-start gap-2 rounded-md bg-white p-6 shadow-md"
          >
            <router-link
              to="/"
              class="rounded-md bg-white p-2 duration-300 hover:bg-gray-200"
              >Settings</router-link
            >
            <router-link
              to="/applications"
              class="rounded-md bg-white p-2 duration-300 hover:bg-gray-200"
              >Applications</router-link
            >
            <button
              @click="logout"
              class="rounded-md bg-white p-2 duration-300 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </Transition>
      </div>
    </nav>
    <nav v-else class="flex items-center gap-4">
      <router-link class="text-base" to="/login">Login</router-link>
      <router-link
        class="flex items-center space-x-2 rounded-md bg-indigo-500 p-2 text-white"
        to="/register"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Join</span>
      </router-link>
    </nav>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: scaleY(0);
  opacity: 0.5;
}
</style>
