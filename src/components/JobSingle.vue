<script setup lang="ts">
import type Job from "@/types/Job";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const props = defineProps<{ job: Job }>();
</script>
<template>
  <div
    class="group flex justify-between border-t-2 border-b-2 border-gray-200 p-4 pb-2"
    :class="{ 'bg-indigo-50': job.highlighted }"
  >
    <img :src="job.company.logo" class="mr-4 h-12 w-12" />

    <div class="flex w-full flex-wrap items-center justify-between">
      <div class="mb-2">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="mr-1 h-4 w-4 text-yellow-500"
            v-if="job.pinned"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>

          <h2 class="font-bold leading-none">
            {{ job.title }}
          </h2>
        </div>

        <a href="#" class="text-sm">
          {{ job.company.fullName }}
        </a>

        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="mr-1 h-4 w-4 text-gray-600"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-sm text-gray-600">
            {{ job.location }}
          </div>
        </div>

        <div class="mt-2 flex gap-2">
          <router-link to="/" v-for="tag in job.tags" :key="tag.id">
            #{{ tag.name }}
          </router-link>
        </div>
      </div>

      <div class="mb-2">
        <div class="flex gap-2 opacity-100 transition-opacity duration-200">
          <router-link
            v-if="job.company.id == auth.user.profile?.id"
            :to="{ name: 'jobs.edit', params: { slug: job.slug } }"
            class="inline-block rounded-lg border-2 border-indigo-400 bg-white px-3 py-2 font-bold text-indigo-400 hover:text-opacity-80"
          >
            Edit
          </router-link>
          <router-link
            :to="{ name: 'jobs.delete', params: { slug: job.slug } }"
            v-if="job.company.id == auth.user.profile?.id"
            class="inline-block rounded-lg border-2 border-red-400 bg-white px-3 py-2 font-bold text-red-400 hover:text-opacity-80"
          >
            Delete
          </router-link>
          <router-link
            v-if="true"
            :to="{ name: 'jobs.details', params: { slug: job.slug } }"
            class="inline-block rounded-lg border-2 border-indigo-400 bg-white px-3 py-2 font-bold text-indigo-400 hover:text-opacity-80"
          >
            Details
          </router-link>
          <router-link
            v-if="auth.user.role === 'developer'"
            :to="{ name: 'jobs.apply', params: { slug: job.slug } }"
            class="inline-block rounded-lg border-2 border-indigo-400 bg-white px-3 py-2 font-bold text-indigo-400 hover:text-opacity-80"
          >
            Apply for this job
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
