<template>
  <base-card>
    <table>
      <thead>
        <HeaderRow :roundRange="roundRange" />
      </thead>
      <tbody class="empty">
        <tr></tr>
      </tbody>
      <tbody class="main">
        <PlayerRow
          v-for="player in playersSortedByTotalScore"
          :key="player.name"
          :player="player"
          :roundRange="roundRange"
        />
      </tbody>
    </table>
  </base-card>
</template>

<script>
import HeaderRow from "./HeaderRow";
import PlayerRow from "./PlayerRow";
import _range from "lodash/range";
export default {
  components: {
    PlayerRow,
    HeaderRow,
  },
  data() {
    return {};
  },
  computed: {
    reversedRoundRange() {
      return _range(this.currentRound - 1, 0);
    },
    roundRange() {
      if (this.currentRound === 1) {
        return [];
      }
      return _range(1, this.currentRound);
    },
    numPlayers() {
      return this.$store.getters.numPlayers;
    },
    players() {
      return this.$store.getters.players;
    },
    playersSortedByTotalScore() {
      return [...this.players].sort((a, b) => b.totalScore - a.totalScore);
    },

    scores() {
      const scores = {};

      for (let roundNum = 1; roundNum < this.currentRound; roundNum++) {
        scores[roundNum] = { bids: [], tricks: [] };

        this.players.forEach((player) => {
          scores[roundNum].bids.push(player.scores[roundNum].bid);
          scores[roundNum].tricks.push(player.scores[roundNum].tricks);
        });
      }
      console.log(scores);
      return scores;
    },

    currentRound() {
      return this.$store.getters.currentRound;
    },
  },
  watch: {
    currentRound() {},
  },
};
</script>

<style >

table {
  margin: auto;
}


th.sub-header {
  font-size: 0.75rem;
}
td {
  width: 4rem;
  height: 2rem;
  border: 1px solid #ccc;
  text-align: center;
}
th {
  background: lightblue;
  border-color: white;
}

thead, tbody.main {
  box-shadow: 0 0 0 1px rgb(133, 133, 133);
}


body {
  padding: 1rem;
}
</style>