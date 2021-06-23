<template>
  <tr>
    <th class="sub-header round">Round:</th>
    <th class="sub-header round" v-for="round in roundRange" :key="round">
      {{ round }}
    </th>
    <th rowspan="3">Score</th>
    <td class="empty" rowspan="3"></td>
  </tr>
  <tr>
    <th class="sub-header num-cards">No. Cards:</th>
    <th class="sub-header num-cards" v-for="round in roundRange" :key="round">
      {{ calcNumCards(round) }}
    </th>
  </tr>
  <tr>
    <th class="sub-header suit">Suit:</th>
    <th class="sub-header suit" v-for="round in roundRange" :key="round">
      {{ calcSuit(round) }}
    </th>
  </tr>
</template>

<script>
export default {
  props: ["roundRange"],
  computed: {
    numPlayers() {
      return this.$store.getters.numPlayers;
    },
  },
  methods: {
    calcNumCards(round) {
      const maxCards = Math.floor(52 / this.numPlayers);
      let numCards = Math.abs(maxCards - ((round - 1) % (maxCards * 2)));
      if (numCards === 0) {
        numCards = 1;
      }
      return numCards;
    },
    calcSuit(round) {
      const suits = this.$store.getters.suits;
      return suits[(round - 1) % suits.length];
    },
  },
};
</script>

<style scoped>
.sub-header {
  font-size: 0.8rem;
  padding: 0.17rem;
  width: 4.5rem;
}

thead tr th.round,
thead tr th.suit {
  background-color: greenyellow;
}
</style>