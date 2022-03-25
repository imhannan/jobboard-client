<script setup lang="ts">
import { onErrorCaptured } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import JobList from "@/components/JobList.vue";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton.vue";

onErrorCaptured((err) => {
  console.log(err.message);
});
</script>
<template>
  <DefaultLayout>
    <Suspense>
      <template #fallback> <home-skeleton /> </template>
      <JobList />
    </Suspense>
  </DefaultLayout>
</template>
