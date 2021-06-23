<template>
  <th>{{ round }}</th>
  <th>{{ numCards }}</th>
  <th>{{ suit }}</th>
</template>

<script>
export default {
  props: ["round"],
  computed: {
    numPlayers() {
      return this.$store.getters.numPlayers;
    },
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
  },
  methods: {},
};
</script>


<style>
</style>