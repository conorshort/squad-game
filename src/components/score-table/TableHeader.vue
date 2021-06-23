<template>
  <tr>
    <th rowspan="2"><div class="rotate small">Round</div></th>
    <th rowspan="2"><div class="rotate small">No.&nbsp;Cards</div></th>
    <th rowspan="2"><div class="rotate small">Suit</div></th>

    <th
      colspan="2"
      class="player-name"
      v-for="(player, idx) in players"
      :key="player.name"
      :class="{highlight: (idx % 2) === 1}"
    >
      {{ player.name }}
    </th>
  </tr>
  <tr>
    <th
      colspan="2"
      v-for="(score, idx) in totalScores"
      :key="idx"
      :style="{ background: hsl_col_perc[idx] }"
    >
      {{ score }}
    </th>
  </tr>
</template>




<script>
function normaliseArray(arr) {
  const max = Math.max(...arr),
    min = Math.min(...arr);
  const normalised = [];
  arr.forEach((element) => {
    normalised.push((element - min) / (max - min));
  });
  return normalised;
}
export default {
  props: ["players"],
  computed: {
    numPlayers() {
      return this.$store.getters.numPlayers;
    },
    totalScores() {
      let scores = [];
      for (const player of this.players) {
        scores.push(player.totalScore);
      }
      return scores;
    },
    hsl_col_perc() {
      const red = 0,
        green = 120;

      const start = red,
        end = green;

      const normalisedScores = normaliseArray(this.totalScores);

      const backgroundColours = [];
      normalisedScores.forEach((element) => {
        let a = element,
          b = (end - start) * a,
          c = b + start;
        backgroundColours.push("hsl(" + c + ", 100%, 65%)");
      });
      return backgroundColours;
    },
  },
};
</script>

<style>
th {
  height: 2rem;
  background: none;
}
.player-name {
  min-width: 5rem;
}
.rotate {
  text-orientation: sideways;
  width: 1.5rem;
  writing-mode: vertical-rl;
}
.small {
  font-size: 0.8rem;
}
.highlight {
  background: rgba(145, 88, 145, 0.164);
}
</style>