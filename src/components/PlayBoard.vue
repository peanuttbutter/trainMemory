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
const isCheckingMatch = ref<boolean>(false)

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function initializeCards(): void {
  const iconPairs: string[] = [...icons, ...icons]
  shuffleArray(iconPairs)
  cards.value = iconPairs.map(
    (icon: string, index: number): Card => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }),
  )
}

function launchConfetti(): void {
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
  (newValue: boolean) => {
    if (newValue) {
      initializeCards()
      cards.value.forEach((card) => (card.isFlipped = true))

      setTimeout((): void => {
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
  (newValue: number) => {
    if (newValue === gameStore.totalPairs * 2) {
      launchConfetti()
      setTimeout(() => {
        gameStore.resetGame()
      }, 3000)
    }
  },
)

async function flipCard(card: Card): Promise<void> {
  if (isCheckingMatch.value || card.isFlipped || card.isMatched) {
    return
  }

  card.isFlipped = true
  flippedCards.value.push(card)

  if (flippedCards.value.length === 2) {
    isCheckingMatch.value = true
    await checkForMatch()
  }
}

async function checkForMatch(): Promise<void> {
  const [firstCard, secondCard] = flippedCards.value
  if (firstCard.icon === secondCard.icon) {
    firstCard.isMatched = true
    secondCard.isMatched = true
    gameStore.incrementScore()
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    firstCard.isFlipped = false
    secondCard.isFlipped = false
  }

  flippedCards.value = []
  isCheckingMatch.value = false
}
</script>

<template>
  <div class="flex flex-col items-center">
    <StartGameButton v-if="!gameStore.isGameStarted" />

    <div
      class="max-w-5xl mx-auto grid grid-cols-6 gap-2 relative"
      :class="{ 'blur-md pointer-events-none': !gameStore.isGameStarted }"
    >
      <PlayCard v-for="card in cards" :key="card.id" :card="card" @flip="flipCard(card)" />
    </div>
  </div>
</template>
