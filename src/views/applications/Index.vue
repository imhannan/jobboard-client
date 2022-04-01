<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const applications = ref([]);

const fetchApplications = async () => {
  try {
    const { data } = await axios.get("/applications", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      baseURL: import.meta.env.VITE_API_URL,
    });
    applications.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchApplications();
});
</script>
<template>
  <div v-if="applications.length">
    <ul class="flex flex-col space-y-2 md:space-y-4">
      <li
        v-for="apps in applications"
        :key="apps.id"
        class="rounded-md border p-2 md:p-4"
      >
        {{ apps.cover_letter }}
      </li>
    </ul>
  </div>
</template>
