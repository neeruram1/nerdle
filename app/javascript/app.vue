<script>
import Game from './Game.vue'

export default {
  setup() {
    return {
      titleClass: 'title'
    }
  },
components: {
    Game
  }
}
</script>

<template>
  <h1 :class="titleClass">A Fun and Exciting Word Game</h1>
  <Game />
</template>

<style>
body {
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  text-align: center;
  margin: 0px auto;
}

h1 {
  margin: 4px 0;
  font-size: 36px;
}

header {
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  position: relative;
}
</style>
