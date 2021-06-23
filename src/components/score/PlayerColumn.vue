<template>
  <div>
    <h4>{{ name }}</h4>
    <h4>{{ totalScore }}</h4>
    <input
      v-if="roundState === 'bidding'"
      type="number"
      :value="bid"
      @change="$emit('update:bid', $event.target.value)"
      min="0"
      :max="numCards"
      keep-alive
    />
    <span v-if="roundState === 'tricks'">
      ({{ bid }})
    </span>
    <input
      v-if="roundState === 'tricks'"
      type="number"
      :value="tricks"
      @change="$emit('update:tricks', $event.target.value)"
      min="0"
      :max="numCards"
      keep-alive
    />
    <div class="flex-upwards">
      <ScoreCell
        v-for="(score, index) in scores"
        :key="index"
        :tricks="score.tricks"
        :bid="score.bid"
      />
    </div>
  </div>
</template>

<script>
import ScoreCell from "./ScoreCell.vue";
export default {
  components: {
    ScoreCell,
  },
  props: ["name", "scores", "totalScore", "bid", "tricks"],
  data() {
    return {};
  },
  methods: {

  },
  computed: {
    numCards() {
      return this.$store.getters.numCardsThisRound;
    },
    roundState() {
      return this.$store.getters.currentRoundState;
    }
  },
};
</script>

<style lang="scss" scoped>
.flex-upwards {
  display: flex;
  flex-direction: column-reverse;
}
</style>