import { defineStore } from 'pinia'

interface GameState {
  score: number
  isGameStarted: boolean
  totalPairs: number
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    score: 0,
    isGameStarted: false,
    totalPairs: 15,
  }),
  actions: {
    incrementScore(): void {
      this.score += 2
      if (this.score === this.totalPairs * 2) {
        this.triggerWin()
      }
    },
    startGame(): void {
      this.isGameStarted = true
      this.score = 0
    },
    resetGame(): void {
      this.isGameStarted = false
      this.score = 0
    },
    triggerWin(): void {
      this.isGameStarted = false
    },
  },
})
