<script>
import Keyboard from './Keyboard.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    Keyboard
  },
  
  methods: {
    renderChar(char) {
      console.log(char)
      },
    }
  }
</script>

<template>
 
  <div id="board">
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
    <div class="boardrow">
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
      <div class="tile"></div>
    </div>
  </div>
  <Keyboard @send-char="renderChar"/>
</template>

<style scoped>
#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(420px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(350px, calc(var(--height) / 6 * 5));
  margin: 0px auto;
}
.boardrow {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
.tile {
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  position: relative;
  border: solid 1px;
}
</style>
