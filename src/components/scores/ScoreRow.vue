<template>
  <tr>
    <td>
      {{ round }}
    </td>
    <td>
      {{ numCards }}
    </td>
    <td>
      {{ suit }}
    </td>
    <td v-for="i in numPlayers" :key="i">
        <span>{{scores.tricks[i - 1]}}</span> <span class="bid">({{scores.bids[i - 1]}}) </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["round", "scores"],
  data() {
    return {
      bids: null,
      tricks: null,
    };
  },
  computed: {
    numCards() {
      const maxCards = Math.floor(52 / this.numPlayers);
      let numCards = Math.abs(maxCards - ((this.round - 1) % (maxCards * 2)));
      if (numCards === 0) {
        numCards = 1;
      }
      return numCards;
    },
    suit() {
      const suits = this.$store.getters.suits;
      return suits[(this.round - 1) % suits.length];
    },
    numPlayers() {
        return this.$store.getters.numPlayers;
    }
  },
  created() {
    // this.bids = this.$store.getters.bidsForRound(this.round);
    // this.tricks = this.$store.getters.tricksForRound(this.round);
  },
};
</script>

<style>
</style>