<script lang="ts" setup>
import { useGameStore } from '../assets/data/gameStore'

const gameStore = useGameStore()

function startGame(): void {
  gameStore.startGame()
}
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
    <button
      @click="startGame"
      class="py-4 px-10 bg-violet-600 text-white text-lg rounded-xl hover:opacity-90 transition-opacity duration-300 focus:outline-none"
    >
      Начать играть
    </button>
  </div>
</template>
