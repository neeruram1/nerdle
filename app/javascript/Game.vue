<script>
import Modal from './Modal.vue'
import { dailyWord, wordList } from './wordList'

export default {
  data() {
    return {
      wordList: wordList,
      showModal: false,
      letterArray: [],
      invalidWord: false,
      allowInput: true,
      isActive: false,
      rowIndex: 0,
      board: 
      Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({
          letter: '',
          status: 'initial'
        }))
      ),
      wordOfTheDay: dailyWord(),
      alphabet: [
        { letters: 'qwertyuiop' },
        { letters: 'asdfghjkl' },
        { letters: 'zxcvbnm' }
      ]
    }  
  },

  components: {
    Modal
  },

  mounted() {
    window.addEventListener("keydown", e => {
      let alpha = Array.from(Array(26)).map((e, i) => i + 65)
      let alphabet = alpha.map((x) => 'Key' + String.fromCharCode(x))
      let letter = String.fromCharCode(e.keyCode).toLowerCase()
      if (this.allowInput) {
        if (e.key === 'Enter') {
          this.checkedTiles()
        } else if (e.key === 'Backspace') {
          this.clearTile()
        } else if (alphabet.includes(e.code)) {
          this.captureLetters(letter)
        }
      } else {
        e.preventDefault()
      }
    });
  },

  computed: {
    guess() {
      return this.letterArray.slice(0,5)
    },

    word() {
      return this.letterArray.slice(0,5).join().replace(/,/g, '')
    },
    currentRow() {
      return this.board[this.rowIndex];
    },

    canSubmit() {
      return this.letterArray.length >= 5
    },

    submitButtonStyles() {
    if (this.canSubmit) {
      return {
        'background-color': '#4c7ef3',
        'cursor': 'pointer'
      }
    } else {
      return {
        'opacity': '0.6',
        'cursor': 'not-allowed'
        }
      }
    }
  },

  methods: {
    clearTile() {
    for (let tile of [...this.currentRow].reverse()) {
      if (tile.letter) {
        tile.letter = ''
        break
      }
    }
    this.letterArray.splice(-1)
  },
  
  captureLetters(letter) {
    this.invalidWord = false
    this.letterArray.push(letter);
    for (let i = 0; i < 5; i++) {
      this.currentRow[i].letter = this.guess[i]
    }
    for (let i = 0; i < this.currentRow.length; i++) {
      if (this.currentRow[i].letter) {
        this.currentRow[i].status = 'filled'
        }
      }
    },

    checkedTiles() {
      if (this.wordList.includes(this.word) === false) {
        this.invalidWord = true
        this.letterArray = []
      }

      if (this.canSubmit) {
        this.currentRow.forEach(this.checkTile)
      if (this.currentRow.every(this.isCorrect)) {
        this.allowInput = false
        this.isActive = false
        this.showModal = true
        return console.log('yay')
        }
        this.rowIndex++
      }
      return this.letterArray = []
    },

    isCorrect(tile) {
      return tile.status === 'correct';
    },
    
    checkTile(row, index) {
      if (this.wordOfTheDay.includes(row.letter) && this.wordOfTheDay[index] != row.letter) {
        row.status = 'wrongplace'
      } else if (this.wordOfTheDay.includes(row.letter) === false && row.letter) {
        row.status = 'incorrect'
      } else if (row.letter && (row.letter === this.wordOfTheDay[index])) {
        row.status = 'correct'
      }
    }
  }
}
</script>

<template>
<div class='game'>
  <h1>Nerdle</h1>
    <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Nerdle</h3>
      </template>
    </modal>
  </Teleport>
    <div class='board'>
      <div class='row' v-for="(row, index) in board">
        <div class='tile' v-for="(tile, index) in row"
          :class="[
            {wrongplace: tile.status === 'wrongplace'}, 
            {correct: tile.status === 'correct'}, 
            {incorrect: tile.status === 'incorrect'},
            {shake: invalidWord}
            ]">
          {{ tile.letter}}
        </div>
      </div>
    </div>


  <div id='keyboard'>
    <span class='keyboard-row' v-for="(row) in alphabet">
        <button class='keyboard-button' v-for="(letter) in row.letters" @click="captureLetters(letter)">
          {{ letter }}
        </button>
    </span>
    <button @click="checkedTiles()" :style="submitButtonStyles">Enter</button>
  </div>
</div>
</template>
<style>
 body {
  font-family: sans-serif;
  text-align: center;
  max-width: 500px;
  margin: 0px auto;
  background-color:slategray;
}

.game {
  font-family: sans-serif;
  font-variant: small-caps;
}
.board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 350px;
  height: 420px;
  margin: 0px auto;
}

.keyboard {
  margin: 0px 0px 8px 0px;
  user-select: none;
  justify-content: center;
  align: center;
}
.keyboard-row {
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
}

.keyboard-button {
  font-family: inherit;
  font-weight: bold;
  font-size: 20px;
  border: solid 1px black;
  margin: 5px 3px 0px 0px;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  color: #1a1a1b;
  flex: 1;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s 1.5s;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}

.tile {
  bottom: 10px;
  justify-content: center;
  align-content: center;
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  user-select: none;
  position: relative;
  border: 2px double black;
  background-color: white;
}

button {
  border: 1px solid darkslategray;
  background-color: gray;
  color: #ffffff;
  padding: 10px 10px 10px 10px;
  font-family: sans-serif;
  font-variant: small-caps;
  font-weight: bold;
  width: 70px;
  height:60px;
}

h1 {
  margin: 4px 0;
  font-size: 36px;
}

.correct {
  background-color: #6aaa64 !important;
}

.wrongplace
 {
  background-color: #c9b458 !important;
}

.incorrect {
  background-color: #787c7e !important;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #0066cc;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  font-variant: small-caps;
}

.modal-body {
  margin: 20px 0;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  font-variant: small-caps;
  font-weight: bold;
  font-size: 18px;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

