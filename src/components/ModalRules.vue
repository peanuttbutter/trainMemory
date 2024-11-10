<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{ (e: 'close'): void }>()

const currentStep = ref<number>(1)

function nextStep(): void {
  currentStep.value = currentStep.value === 1 ? 2 : 1
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
    <div class="relative flex items-center mt-5 sm:mt-10">
      <button
        v-show="currentStep === 2"
        @click="nextStep"
        class="absolute left-[-35px] sm:left-[-45px] top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
      >
        <font-awesome-icon icon="angles-left" size="lg" style="color: #7651e6" />
      </button>

      <div
        class="flex flex-col items-center bg-slate-400 p-4 sm:p-6 rounded-lg shadow-lg h-64 sm:h-80 w-72 sm:w-96 max-w-xs sm:max-w-xl"
      >
        <button
          @click="emit('close')"
          class="absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer hover:opacity-70"
        >
          <font-awesome-icon icon="circle-xmark" size="lg" style="color: #7651e6" />
        </button>

        <h2 class="text-xl sm:text-2xl font-bold text-center mt-2 sm:mt-4 mb-2 sm:mb-4">
          Правила игры
        </h2>

        <div class="px-1 sm:px-2 text-base sm:text-lg text-center">
          <p v-show="currentStep === 1">
            Цель игры: запомнить расположение одинаковых карточек, которые разложены случайным
            образом. <br />
            Игра будет успешно закончена, когда все карточки открыты.
          </p>
          <p v-show="currentStep === 2">
            За ход необходимо открывать по две карточки, и если рисунок на них совпадает, то они
            остаются открытыми. <br />
            Если карточки не совпадают, то обе карточки переворачиваются обратно, и игрок заново
            начинает ход.
          </p>
        </div>
      </div>

      <button
        v-show="currentStep === 1"
        @click="nextStep"
        class="absolute right-[-35px] sm:right-[-45px] top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
      >
        <font-awesome-icon icon="angles-right" size="lg" style="color: #7651e6" />
      </button>
    </div>
  </div>
</template>
