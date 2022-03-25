<script setup lang="ts">
import { ref, computed } from "vue";
import type Job from "@/types/Job";
import JobSingle from "./JobSingle.vue";
import type JobCollection from "@/types/JobCollection";
import job from "@/services/job";
import { useIntersectionObserver } from "@vueuse/core";

const jobs = ref<Job[]>([]);
const data: JobCollection = await job.getAll();
jobs.value = data.data;

const target = ref(null);
const currentPage = ref(1);
const lastPage = data.meta.last_page;
const isFetchable = computed(() => currentPage.value < lastPage);
const isFetching = ref(false);

const loadMore = async (page: number) => {
  const data: JobCollection = await job.getAll(page);
  jobs.value = jobs.value.concat(data.data);
};

useIntersectionObserver(target, async ([{ isIntersecting }]) => {
  if (isIntersecting && currentPage.value <= lastPage) {
    isFetching.value = true;
    await loadMore(++currentPage.value);
  }

  isFetching.value = false;
});
</script>
<template>
  <div v-if="jobs.length" class="flex flex-col space-y-2 md:space-y-4">
    <div
      v-for="job in jobs"
      :key="job.id"
      class="flex flex-col space-y-2 md:space-y-4"
    >
      <job-single :job="job" />
    </div>
    <div ref="target" v-if="isFetchable"></div>
    <div v-if="isFetching" class="flex items-center justify-center">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 24 30"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
        class="h-10 w-16"
      >
        <rect x="0" y="13" width="4" height="5" fill="#6366f1">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="10" y="13" width="4" height="5" fill="#6366f1">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" y="13" width="4" height="5" fill="#6366f1">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  </div>
</template>
