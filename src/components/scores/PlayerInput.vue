<template>
  <div class="column-container">
    <label for="bid"
      >{{ name }}
      <span v-if="roundState === 'tricks'" class="bid-display"
        >({{ bid }})</span
      ></label
    >
    <div>
      <input
        v-if="roundState === 'bidding'"
        type="number"
        :value="bid"
        @input="$emit('update:bid', $event.target.value)"
        min="0"
        :max="numCards"
        keep-alive
        name="bid"
        :class="{'error': bidInvalid}"
      />

      <input
        v-if="roundState === 'tricks'"
        type="number"
        :value="tricks"
        @input="$emit('update:tricks', $event.target.value)"
        min="0"
        :max="numCards"
        name="tricks"
        keep-alive
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "scores", "totalScore", "bid", "tricks", "numCards", "bidInvalid"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    roundState() {
      return this.$store.getters.currentRoundState;
    },
  },
};
</script>

<style  scoped>
.column-container {
  display: flex;
  flex-direction: column;
}

.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}


input[type="number"] {
  /* width: 100%; */
  padding: 0.2rem 1rem;
  margin: 0.2rem 1rem;
  /* display: inline-block; */
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline;
}

.error {
  border: 2px solid red !important;
  background-color:  rgb(255, 234, 234) !important;


}
</style>