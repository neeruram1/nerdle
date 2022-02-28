<script>
import Keyboard from './Keyboard.vue'

export default {
  data() {
    return {
      titleClass: 'title',
    }
  },
components: {
    Keyboard
      }
}
</script>

<template>
  <h1 :class="titleClass">A Fun and Exciting Word Game</h1>
  <Keyboard />
</template>

<style>
</style>
