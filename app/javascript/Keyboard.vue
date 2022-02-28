<script>
import LetterGrid from './LetterGrid.vue'

export default {
props: ['clickedLetters'],
  data() {
    return {
      rows: [
          {chars: 'qwertyuiop'.split('')},
          {chars: 'asdfghjkl'.split('')},
          {chars: ['Enter', ...'zxcvbnm'.split(''), 'Backspace']}
          ],
        clickedLetters: []
    }
  },
  components: {
    LetterGrid
  }
}
</script>

<template>
  <div id="keyboard">
    <p class= "row" v-for="row in rows">
        <div v-for="char in row.chars">
            <button @click="clickedLetters.push(char)">
                {{ char }}
            </button>
        </div>
    </p>
  </div>
  <LetterGrid :clickedLetters="letters" />
</template>

<style>
#keyboard {
  margin: 30px 8px 0;
}
.row {
  display: flex;
  width: 150%;
  margin: 0 auto 8px;
}
button {
  font-weight: bold;
  border: 15;
  padding: 30;
  margin: 0 10px 10 10;
  height: 35px;
  border-radius: 6px;
  background-color: #d3d6da;
  color: #1a1a1b;
  flex: 1.5;
  display: flex;
  align-items: center;
  text-transform: uppercase;
}
</style>
