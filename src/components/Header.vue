<script lang="ts" setup>
import { ref } from 'vue'

import ModalRules from './ModalRules.vue'
import { useGameStore } from '../modules/card/store/gameStore'

const gameStore = useGameStore()
const showModal = ref<boolean>(false)
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-between p-4 text-gray-700 w-full max-w-4xl mx-auto bg-slate-400 shadow-xl rounded-xl"
  >
    <div class="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-7 mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">Тренируй память</h1>
      <p class="text-xl sm:text-2xl font-bold">
        {{ gameStore.score }}/{{ gameStore.totalPairs * 2 }}
      </p>
    </div>
    <button @click="showModal = true" class="cursor-pointer hover:opacity-70 mt-2 sm:mt-0">
      <font-awesome-icon icon="circle-question" size="xl" style="color: #7651e6" />
    </button>
    <transition>
      <ModalRules v-if="showModal" @close="showModal = false" />
    </transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
