<script setup lang="ts">
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { useRouter } from "vue-router";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    const isLoggedIn = await authStore.login(form);
    if (isLoggedIn) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  } else {
    v$.value.$errors.forEach((err) => {
      console.log(err.$property, err.$message);
    });
  }
};

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
  };
});

const v$ = useVuelidate(rules, form, {
  $lazy: true,
  $autoDirty: true,
});
</script>
<template>
  <default-layout>
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto flex max-w-md flex-col space-y-2 md:space-y-4"
    >
      <h1 class="text-xl font-semibold text-slate-700">Login</h1>

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

      <button class="rounded-md bg-indigo-500 p-2 text-white">Login</button>
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
