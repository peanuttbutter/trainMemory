import { defineStore } from 'pinia'

import type { Card } from '../../../types/Card'
import { icons } from '../../../assets/data/icons'

interface GameState {
  score: number
  isGameStarted: boolean
  totalPairs: number
  cards: Card[]
  flippedCards: Card[]
  isCheckingMatch: boolean
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    score: 0,
    isGameStarted: false,
    totalPairs: 15,
    cards: [],
    flippedCards: [],
    isCheckingMatch: false,
  }),

  actions: {
    startGame() {
      this.isGameStarted = true
      this.score = 0
      this.initializeCards()
    },

    resetGame() {
      this.isGameStarted = false
      this.score = 0
      this.cards = []
      this.flippedCards = []
      this.isCheckingMatch = false
    },

    incrementScore() {
      this.score += 2
      if (this.score === this.totalPairs * 2) {
        this.triggerWin()
      }
    },

    triggerWin() {
      this.isGameStarted = false
    },

    initializeCards() {
      const iconPairs: string[] = [...icons, ...icons]
      this.shuffleArray(iconPairs)
      this.cards = iconPairs.map(
        (icon: string, index: number): Card => ({
          id: index,
          icon,
          isFlipped: false,
          isMatched: false,
        }),
      )

      this.cards.forEach((card) => (card.isFlipped = true))
      setTimeout(() => {
        this.cards.forEach((card) => {
          if (!card.isMatched) {
            card.isFlipped = false
          }
        })
      }, 5000)
    },

    shuffleArray<T>(array: T[]): T[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },

    flipCard(cardId: number) {
      if (this.isCheckingMatch) return
      const card = this.cards.find((c) => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched) return

      card.isFlipped = true
      this.flippedCards.push(card)
      if (this.flippedCards.length === 2) {
        this.checkForMatch()
      }
    },

    async checkForMatch() {
      this.isCheckingMatch = true
      const [firstCard, secondCard] = this.flippedCards

      if (firstCard.icon === secondCard.icon) {
        firstCard.isMatched = true
        secondCard.isMatched = true
        this.incrementScore()
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        firstCard.isFlipped = false
        secondCard.isFlipped = false
      }

      this.flippedCards = []
      this.isCheckingMatch = false
    },
  },
})
