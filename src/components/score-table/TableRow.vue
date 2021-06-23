<template>
  <tr >
    <RoundCell :round="round" />
    <ScoreCell
      v-for="idx in numPlayers"
      :key="idx"
      :bid="scores.bids[idx - 1]"
      :tricks="scores.tricks[idx - 1]"
      :total="scores.subTotal[idx - 1]"
      :highlight="(idx % 2) === 0"
    />
  </tr>


</template>

<script>
import RoundCell from "./RoundCell";
import ScoreCell from "./ScoreCell";
export default {
  props: ["round", "scores"],
  components: {
    ScoreCell,
    RoundCell
  },
  computed: {
    numPlayers() {
      return this.$store.getters.numPlayers;
    },
  },
};
</script>

<style>
</style>