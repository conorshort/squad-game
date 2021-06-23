<template>
  <div>
    <h4>Round</h4>
    <RoundCell :title="true" />
    <div class="flex-upwards">
      <RoundCell v-for="round in currentRound" :key="round" :round="round" />
    </div>
  </div>
</template>

<script>
import RoundCell from "./RoundCell.vue";
export default {
  components: {
    RoundCell,
  },
  // props: ["name", "scores", "totalScore"],
  computed: {
    currentRound() {
      return this.$store.getters.currentRound;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-upwards {
  display: flex;
  flex-direction: column-reverse;
}
</style>