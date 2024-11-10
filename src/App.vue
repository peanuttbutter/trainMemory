<script lang="ts" setup>
import Header from './components/Header.vue'
import PlayBoard from './modules/card/views/PlayBoard.vue'
</script>

<template>
  <div class="container w-4/5 mt-10 mx-auto">
    <Header />
    <div class="mt-5">
      <PlayBoard />
    </div>
  </div>
</template>
