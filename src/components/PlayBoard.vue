<script lang="ts" setup>
import { ref, watch } from 'vue'

import PlayCard from './PlayCard.vue'
import StartGameButton from './StartGameButton.vue'

import { icons } from '../assets/data/icons'
import { useGameStore } from '../assets/data/gameStore'

import type { Card } from '../types/card'
import confetti from 'canvas-confetti'

const gameStore = useGameStore()
const cards = ref<Card[]>([])
const flippedCards = ref<Card[]>([])
const isCheckingMatch = ref(false)

function initializeCards() {
  const iconPairs = [...icons, ...icons]
  iconPairs.sort(() => 0.5 - Math.random())
  cards.value = iconPairs.map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false,
  }))
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    origin: { y: 1 },
    colors: ['#ff9a9e', '#fad0c4', '#fbc2eb', '#8fd3f4', '#a6c1ee'],
  })
}

watch(
  () => gameStore.isGameStarted,
  (newValue) => {
    if (newValue) {
      initializeCards()
      cards.value.forEach((card) => (card.isFlipped = true))

      setTimeout(() => {
        cards.value.forEach((card) => {
          if (!card.isMatched) {
            card.isFlipped = false
          }
        })
      }, 5000)
    }
  },
  { immediate: true },
)

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

function flipCard(card: Card) {
  if (isCheckingMatch.value || card.isFlipped || card.isMatched) {
    return
  }

  card.isFlipped = true
  flippedCards.value.push(card)

  if (flippedCards.value.length === 2) {
    isCheckingMatch.value = true
    checkForMatch()
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards.value
  if (firstCard.icon === secondCard.icon) {
    firstCard.isMatched = true
    secondCard.isMatched = true
    gameStore.incrementScore()
  } else {
    setTimeout(() => {
      firstCard.isFlipped = false
      secondCard.isFlipped = false
    }, 1000)
  }

  setTimeout(() => {
    flippedCards.value = []
    isCheckingMatch.value = false
  }, 1000)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <StartGameButton v-if="!gameStore.isGameStarted" />

    <div
      class="max-w-5xl mx-auto grid grid-cols-6 gap-2 relative"
      :class="{ 'blur-md pointer-events-none': !gameStore.isGameStarted }"
    >
      <PlayCard v-for="card in cards" :key="card.id" :card="card" :onFlip="() => flipCard(card)" />
    </div>
  </div>
</template>
