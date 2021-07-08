<template>
  <base-card>
    <form>
      <div class="column-container">
        <label for="num-players"><h3>Enter number of players:</h3></label>
        <div>
          <input
            type="number"
            v-model.number="numPlayers"
            min="3"
            max="8"
            name="num-players"
            keep-alive
          />
        </div>
      </div>
      <div class="column-container">
        <h3>Enter player names:</h3>
        <div v-for="i in numPlayers" :key="i" class="row-container">
          <label :for="'player-' + i">
            <b>Player {{ i }}</b>
            <span v-if="i === 1"> (left of dealer)</span>
            <span v-if="i === numPlayers"> (dealer)</span>
          </label>
          <input
            type="text"
            :name="'player-' + i"
            keep-alive
            required
            :ref="'player-' + i"
          />
        </div>
      </div>
      <div class="start-container">
        <base-button @click.prevent="startNewGame" :disabled="playersValid"> Start! </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import BaseButton from "../components/ui/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      numPlayers: 3,
      showErrors: false,
    };
  },

  methods: {
    startNewGame() {
      const playerNames = Array(this.numPlayers);


      for (let i = 1; i <= this.numPlayers; i++) {
        const val = this.$refs[`player-${i}`].value;

        playerNames[i - 1] = val;
      }
      if(playerNames.some(pName => pName === '')) {
        return
      }

      this.$store.dispatch("startNewGame", { playerNames });
      this.$router.push("/play");
    },
  },
  // mounted() {
  //   this.namesValid = new Array(this.numPlayers).fill(true);
  // }
};
</script>

<style scoped>
.column-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

input {
  /* width: 100%; */
  padding: 0.2rem 1rem;
  margin: 0.5rem 1rem;
  /* display: inline-block; */
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline;
}

.error {
  border: 2px solid red !important;
  background-color: rgb(255, 234, 234) !important;
}

label {
  min-width: 10rem;
  text-align: right;
}

.start-container {
  margin: 1.75rem 0 1rem;
}
</style>