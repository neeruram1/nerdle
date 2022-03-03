<script>
export default {
  data() {
    return {
      rows: [
          {chars: 'qwertyuiop'.split('')},
          {chars: 'asdfghjkl'.split('')},
          {chars: [...'zxcvbnm'.split('')]}
          ],
        clickedLetters: []
    }
  },

  methods: {
    sendLetter(char){
      this.$emit('send-char', char)
    }
  }
}
</script>

<template>
  <div id="keyboard">
    <div class= "keyboardrow" v-for="(row, i) in rows">
        <div v-for="char in row.chars">
            <button @click="sendLetter(char)">
                {{ char }}
            </button>
        </div>
      </div>
  </div>
</template>

<style scoped>
#keyboard {
  margin: 40px 50px 0px 40px;
  user-select: none;
  display: inline-block;
}
.keyboardrow {
  display: flex;
  touch-action: manipulation;
}

button {
  padding: 16px;
  width: 40px;
  font-family: inherit;
  outline-style: outset;
  outline-width: thin;
  outline-color: lime;
  margin: 5px 5px 5px 5px;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #d3d6da;
  color: #1a1a1b;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  transition-duration: 0.4s;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
