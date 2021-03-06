<script setup lang="ts">
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoadingButton from "@/components/loading/LoadingButton.vue";

const authStore = useAuthStore();
const router = useRouter();
const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
});

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
    password_confirmation: { required, sameAsPassword: sameAs(form.password) },
    role: { required },
  };
});

const v$ = useVuelidate(rules, form, {
  $lazy: true,
  $autoDirty: true,
});
const handleSubmit = async function () {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    const isRegistered = await authStore.register(form);
    if (isRegistered) {
      router.push("/");
      v$.value.$reset();
    } else {
      alert("Something went wrong");
    }
  } else {
    v$.value.$errors.forEach((err) => {
      console.log(err.$property, err.$message);
    });
  }
};
</script>
<template>
  <default-layout>
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto flex max-w-md flex-col space-y-2 md:space-y-4"
    >
      <h1 class="text-xl font-semibold text-slate-700">Register</h1>
      <div class="flex">
        <label
          for="developer"
          class="flex grow items-center justify-center rounded-md border border-indigo-500 p-2 checked:bg-indigo-500 checked:text-white"
        >
          <input
            type="radio"
            id="developer"
            name="role"
            value="developer"
            v-model="form.role"
          />
          Developer
        </label>
        <label
          for="company"
          class="flex grow items-center justify-center rounded-md border border-indigo-500 p-2 checked:bg-indigo-500 checked:text-white"
        >
          <input
            type="radio"
            id="company"
            name="role"
            value="company"
            v-model="form.role"
          />
          Company
        </label>
      </div>
      <ul v-if="v$.role.$error">
        <li class="error" v-for="err in v$.role.$errors" :key="err.$uid">
          {{ err.$message }}
        </li>
      </ul>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          class="form-control"
          v-model="form.name"
        />
        <ul v-if="v$.name.$error">
          <li class="error" v-for="err in v$.name.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
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
        <ul v-if="v$.email.$error">
          <li class="error" v-for="err in v$.email.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          class="form-control"
          v-model="form.password"
        />
        <ul v-if="v$.password.$error">
          <li class="error" v-for="err in v$.password.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          class="form-control"
          v-model="form.password_confirmation"
        />
        <ul v-if="v$.password_confirmation.$error">
          <li
            class="error"
            v-for="err in v$.password_confirmation.$errors"
            :key="err.$uid"
          >
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <button
        class="flex items-center justify-center space-x-2 rounded-md bg-indigo-500 p-2 text-white"
        :disabled="authStore.loading"
      >
        <loading-button v-if="authStore.loading" />
        <span>Register</span>
      </button>
    </form>
  </default-layout>
</template>
<style scoped>
.form-group {
  @apply flex flex-col space-y-2;
}
.form-control {
  @apply rounded-md border-2 border-gray-300;
}

.error {
  @apply text-red-500;
}
</style>
