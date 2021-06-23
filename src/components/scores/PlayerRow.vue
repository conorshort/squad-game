<template>
  <tr>
    <th>{{ player.name }}</th>

    <td v-for="round in roundRange" :key="round">
        <span class="bid">({{ player.scores[round].bid}})</span> {{ player.scores[round].tricks}}
    </td>
    <td class="total-score">{{ player.totalScore }}</td>
    <th>{{ player.name }}</th>

  </tr>
</template>

<script>

export default {
  props: ["player", "roundRange"],
  computed: {


    currentRound() {
      return this.$store.getters.currentRound;
    },
  },
};
</script>

<style lang="scss" scoped>
    .bid {
        font-style: italic;
    }
</style>