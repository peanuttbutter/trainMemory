import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    isGameStarted: false,
    totalPairs: 15,
  }),
  actions: {
    incrementScore() {
      this.score += 2
      if (this.score === this.totalPairs * 2) {
        this.triggerWin()
      }
    },
    startGame() {
      this.isGameStarted = true
      this.score = 0
    },
    resetGame() {
      this.isGameStarted = false
      this.score = 0
    },
    triggerWin() {
      this.isGameStarted = false
    },
  },
})
