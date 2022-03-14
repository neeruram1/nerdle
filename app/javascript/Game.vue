<script>
export default {
  data() {
    return {
      rowIndex: 0,
      board: 
      Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({
          letter: '',
          status: 'INITIAL'
        }))
      ),
      isActive: false,
      letterArray: [],
      wordList: ['about', 'great', 'ought', 'helps', 'crazy'],
      alphabet: [
        { letters: 'qwertyuiop' },
        { letters: 'asdfghjkl' },
        { letters: 'zxcvbnm' }
      ]
    }  
  },

  computed: {
    currentRow() {
      return this.board[this.rowIndex];
    },

    wordOfTheDay: function() {
      return this.wordList[Math.floor(Math.random() * this.wordList.length)];
    },

    canSubmit: function() {
      return this.letterArray.length >= 5
    },

    submitButtonStyles: function() {
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
    captureLetters: function(letter) {
      this.letterArray.push(letter);
      let guess = this.letterArray.slice(0,5)

      for (let i = 0; i < 5; i++)
      {
        this.currentRow[i].letter = guess[i]
      }
    },

    checkedTiles: function() {
      if (this.canSubmit) {
      this.currentRow.forEach(this.checkTile)
      this.rowIndex ++
      this.letterArray = []
      }
    },

    checkTile: function(row, index) {
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
  <p>Today's answer is {{ wordOfTheDay }}</p>
  <p></p>
    <div class='board'>
      <div class='row' v-for="(row, index) in board">
        <div class='tile' v-for="(tile, index) in row"
          :class="[
            {wrongplace: tile.status === 'wrongplace'}, 
            {correct: tile.status === 'correct'}, 
            {incorrect: tile.status === 'incorrect'}
            ]">
          {{ tile.letter}}
        </div>
      </div>
    </div>


  <div id='keyboard'>
    <span v-for="(row) in alphabet">
      <p>
        <button v-for="(letter) in row.letters" @click="captureLetters(letter)">
          {{ letter }}
        </button>
      </p>
    </span>
    <button @click="checkedTiles()" :style="submitButtonStyles">Enter</button>
  </div>
</div>
</template>

<style>

</style>


