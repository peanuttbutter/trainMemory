<script lang="ts" setup>
import { computed, watch } from 'vue'

import PlayCard from '../../../components/PlayCard.vue'
import StartGameButton from '../../../components/StartGameButton.vue'

import { useGameStore } from '../store/gameStore'
import confetti from 'canvas-confetti'

const gameStore = useGameStore()

const cards = computed(() => gameStore.cards)

watch(
  () => gameStore.score,
  (newValue) => {
    if (newValue === gameStore.totalPairs * 2) {
      launchConfetti()
      setTimeout(() => {
        gameStore.resetGame()
      }, 3000)
    }
  },
)

function launchConfetti() {
  const duration = 2500
  const end = Date.now() + duration

  const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#8fd3f4', '#a6c1ee']
  ;(function frame() {
    confetti({
      particleCount: 3,
      startVelocity: 30,
      ticks: 200,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}
</script>

<template>
  <div class="flex flex-col items-center">
    <StartGameButton v-if="!gameStore.isGameStarted" />

    <div
      class="max-w-5xl mx-auto grid grid-cols-6 gap-2 relative"
      :class="{ 'blur-md pointer-events-none': !gameStore.isGameStarted }"
    >
      <PlayCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @flip="() => gameStore.flipCard(card.id)"
      />
    </div>
  </div>
</template>
