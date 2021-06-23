<template>
  <div class="flex" v-if="title">
    <div class="fixed-width title-text round">Round No. </div>
    <div class="fixed-width title-text suit">Suit</div>
    <div class="fixed-width title-text num-cards"> No. cards</div>
  </div>
  <div class="flex" v-else>
    <div class="fixed-width round">{{ round }}</div>
    <div class="fixed-width suit">{{ suit }}</div>
    <div class="fixed-width num-cards">{{ numCards }}</div>
  </div>
</template>

<script>
export default {
  props: ["round", "title"],
  computed: {
    suit() {
      const suits = this.$store.getters.suits;
      return suits[(this.round - 1) % suits.length];
    },
    numCards() {
      const numPlayers = this.$store.getters.numPlayers;
      const maxCards = Math.floor(52 / numPlayers);
      let numCards = Math.abs(maxCards - ((this.round - 1) % (maxCards * 2)));
      if (numCards === 0) {
        numCards = 1;
      }
      return numCards;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .flex {
    display: flex;
    justify-content: space-around;
    min-width: 180px;
  }
  .fixed-width {
    width: 30%;
  }
  .title-text {
      font-size: 0.7rem;
      margin-top: 19px;
      margin-bottom: 10px;
  }
}
</style>