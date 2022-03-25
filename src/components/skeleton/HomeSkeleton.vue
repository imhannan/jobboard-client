<template>
  <div
    class="container fixed top-0 left-0 right-0 mx-auto w-full bg-white px-4 md:px-8"
  >
    <div
      class="flex h-24 w-full items-center justify-between border-t-4 border-b-2 bg-white px-2 md:px-4"
    >
      <div class="skeleton-animation h-12 w-24 bg-gray-300"></div>
      <div class="flex space-x-2 md:space-x-4">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
    <div
      class="group flex justify-between border-t-2 border-b-2 border-gray-200 p-4 pb-2"
      v-for="n in 10"
      :key="n"
    >
      <div class="flex items-center space-x-2 md:space-x-4">
        <span class="skeleton-animation h-12 w-12 bg-gray-300"></span>
        <div class="flex flex-col space-y-2 md:space-y-4">
          <span class="text text-large"></span>
          <span class="text text-small"></span>
          <span class="text text-medium"></span>
          <div class="flex space-x-2 md:space-x-4">
            <span v-for="n in 4" :key="n" class="text text-short"></span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply skeleton-animation h-10 w-20 rounded-md bg-gray-300;
}

.text {
  @apply skeleton-animation inline-block h-2 bg-gray-300;
}

.text-small {
  @apply w-16;
}

.text-medium {
  @apply w-24;
}

.text-large {
  @apply w-32;
}

.text-short {
  @apply w-8;
}

.skeleton-animation {
  animation: skeleton-animation 1s ease-in-out infinite;
}

@keyframes skeleton-animation {
  0% {
    background-color: white;
  }
  100% {
    background-color: rgb(209, 213, 219);
  }
}
</style>
