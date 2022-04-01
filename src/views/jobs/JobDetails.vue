<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import jobService from "@/services/job";
import JobSingle from "@/components/JobSingle.vue";
import type Job from "@/types/Job";

const route = useRoute();
const job: Ref<Job | undefined> = ref({} as Job);

onMounted(async () => {
  job.value = await jobService.getSingle(route.params.slug);
});
</script>
<template>
  <div class="flex flex-col space-y-2 md:space-y-4">
    <job-single :job="job" v-if="job?.id" />
    <article
      class="prose max-w-none md:prose-lg lg:prose-xl"
      v-if="job?.desc"
      v-html="job.desc"
    ></article>
  </div>
</template>
