<template>
  <base-card >
    <h1>Start a new game</h1>
    <base-button @click="newGame">
      Start!
    </base-button>
  </base-card>
    <h1 class="mb">Load a previous game</h1>


  <base-card>
    <h3 v-if="games.length === 0">Looks like you have no saved games. Start a new one above!</h3>
    <base-card v-for="game in games" :key="game.startTime">
      <h3>{{ new Date(game.startTime).toLocaleString() }}</h3>
      <div>
        <h4>Round {{ game.currentRound }}, {{ game.currentRoundState }}</h4>
      </div>
      <div>
        <p><b>Players: </b> {{ game.playerNames.join(", ") }}</p>
      </div>
      <base-button @click="loadGame(game.startTime)"> Load </base-button>
      <base-button @click="deleteGame(game.startTime)" :outline="true">
        Delete
      </base-button>
    </base-card>
  </base-card>
</template>

<script>
import BaseButton from "../components/ui/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    newGame() {
      this.$router.push('/new')
    },


    loadGame(startTime) {
      this.$store.dispatch("loadFromLocalStorage", startTime);
      this.$router.push("/play");
    },
    deleteGame(startTime) {
      localStorage.removeItem("squadgame--" + startTime);
      this.loadFromLocalStorage();
    },
    loadFromLocalStorage() {
      this.games = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("squadgame--")) {
          const game = JSON.parse(localStorage[key]);
          this.games.push(game);
        }
      }
      console.log(this.games);
      this.games.sort((a, b) => {
        console.log(typeof a.startTime);
        return b.startTime - a.startTime;
      });
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
.mb {
  margin-top: 4rem;
}
h4 {
  text-transform: capitalize;
}
</style>