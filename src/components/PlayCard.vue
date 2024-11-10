<script lang="ts" setup>
import { defineProps } from 'vue'

import type { Card } from '../types/card'

const props = defineProps<{ card: Card; onFlip: () => void }>()

function flipCard(): void {
  if (!props.card.isMatched && !props.card.isFlipped) {
    props.onFlip()
  }
}
</script>

<template>
  <div
    @click="flipCard"
    :class="[
      'card w-14 h-20 cursor-pointer transform transition-transform duration-300',
      { flipped: card.isFlipped, matched: card.isMatched },
    ]"
  >
    <div class="card-inner relative w-full h-full">
      <div
        class="card-front absolute w-full h-full bg-slate-400 rounded-xl flex items-center justify-center"
      >
        <font-awesome-icon icon="star" size="xl" style="color: #7651e6" />
      </div>
      <div
        class="card-back absolute w-full h-full bg-indigo-200 rounded-xl flex items-center justify-center"
      >
        <font-awesome-icon :icon="card.icon" size="2xl" style="color: #7651e6" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  perspective: 1000px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.3s;
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.matched .card-back {
  background-color: #90ee90;
}

.matched {
  cursor: default;
}
</style>
