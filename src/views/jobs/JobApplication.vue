<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { useRouter, useRoute } from "vue-router";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import application from "@/services/application";
import LoadingButton from "@/components/loading/LoadingButton.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const loading = ref(false);

const form = reactive({
  name: authStore.user.name,
  email: authStore.user.email,
  phone: "",
  resume: "",
  cover_letter: "",
  salary: 0,
});

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    phone: { required },
    cover_letter: { required },
    salary: { required },
  };
});

const v$ = useVuelidate(rules, form, {
  $lazy: true,
  $autoDirty: true,
});

const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    loading.value = true;
    const data = await application.create(route.params.slug, form);
    if (data) {
      console.log(data.message);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  } else {
    v$.value.$errors.forEach((err) => {
      console.log(err.$property, err.$message);
    });
  }
  loading.value = false;
};
</script>
<template>
  <div class="mx-auto flex max-w-md flex-col space-y-4 md:space-y-8">
    <h1 class="text text-center text-xl font-bold md:text-3xl">
      Apply For this job
    </h1>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col space-y-2 md:space-y-4"
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          class="form-control"
          v-model="form.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          class="form-control"
          v-model="form.email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          name="phone"
          id="phone"
          type="text"
          class="form-control"
          v-model="form.phone"
        />
      </div>
      <div class="form-group">
        <label for="salary">Expected Salary</label>
        <input
          type="range"
          id="salary"
          name="salary"
          min="20"
          max="100"
          step="10"
          v-model="form.salary"
        />
      </div>
      <div class="form-group">
        <label for="resume">Resume</label>
        <input
          name="resume"
          id="resume"
          type="file"
          class="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div class="form-group">
        <label for="cover_letter">Cover Letter</label>
        <textarea
          name="cover_letter"
          id="cover_letter"
          class="form-control"
          v-model="form.cover_letter"
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn btn-primary flex items-center justify-center"
      >
        <loading-button v-if="loading" />
        <span>Submit</span>
      </button>
    </form>
  </div>
</template>
