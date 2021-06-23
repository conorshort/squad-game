<template>
  <base-card>
    <table>
      <thead>
        <TableHeader :players="players"/>
      </thead>
      <tbody class="empty">
        <tr></tr>
      </tbody>
      <tbody class="main">
          <TableRow v-for="round in reversedRoundRange" :key="round" :scores="scores[round]" :round="round"/>
      </tbody>
    </table>
  </base-card>
</template>

<script>
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import _range from "lodash/range";
export default {
  components: {
    TableRow,
    TableHeader,
  },
  data() {
    return {};
  },
  methods: {

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
        scores[roundNum] = { bids: [], tricks: [], subTotal: [] };

        this.players.forEach((player) => {
          scores[roundNum].bids.push(player.scores[roundNum].bid);
          scores[roundNum].tricks.push(player.scores[roundNum].tricks);
          scores[roundNum].subTotal.push(player.getTotalScoreAtRound(roundNum));
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
  background: rgba(173, 216, 230, 0.432);
  border-color: white;
}

thead, tbody.main {
  box-shadow: 0 0 0 1px rgb(133, 133, 133);
}

tr:nth-child(even){background-color: #e4e4e4;}
/* body {
  padding: 1rem;
} */
</style>