<template>
  <div class="flex">
    <RoundColumn />
    <PlayerColumn
      v-for="(player, idx) in players"
      :key="idx"
      :name="player.name"
      :scores="player.scores"
      :totalScore="player.totalScore"
      v-model:bid.number="currentRoundBids[idx]"
      :bidInvalid="currentRoundBids[idx] === undefined && bidsInvalid"
      v-model:tricks.number="currentRoundTricks[idx]"
    />
  </div>
  <p>Total bids: {{ totalBids }}</p>
  <p>Total tricks: {{ totalTricks }}</p>

  <button v-if="roundState === 'bidding'" @click="submitBids" :disabled="currentRoundBids.some((bid) => bid === null)">
    Enter bids
  </button>
  <button v-if="roundState === 'tricks'" @click="editBids">Edit bids</button>
  <button
    v-if="roundState === 'tricks'"
    @click="submitTricks"
    :disabled="totalTricks !== numCardsThisRound"
  >
    Enter tricks
  </button>
</template>

<script>
import PlayerColumn from "./PlayerColumn";
import RoundColumn from "./RoundColumn";

export default {
  components: {
    PlayerColumn,
    RoundColumn,
  },
  data() {
    return {
      currentRoundBids: null,
      currentRoundTricks: null,
      bidsInvalid: false,
      tricksInvalid: false,
    };
  },
  computed: {
    players() {
      return this.$store.getters.players;
    },
    roundState() {
      return this.$store.getters.currentRoundState;
    },
    totalBids() {
      return this.currentRoundBids.reduce((a, b) => a + b);
    },
    totalTricks() {
      return this.currentRoundTricks.reduce((a, b) => a + b);
    },
    numCardsThisRound() {
      return this.$store.getters.numCardsThisRound;
    },
  },
  methods: {
    // addData() {
    //   this.$store.dispatch("addBids", this.currentRoundBids);
    //   this.$store.dispatch("addTricks", this.currentRoundTricks);
    // },
    submitBids() {
      this.bidsInvalid = false;

      if (this.currentRoundBids.some((bid) => bid === null)) {
        this.bidsInvalid = true;
        return;
      }
      console.log("Happy bids");

      // this.$store.dispatch("addBids", this.currentRoundBids);

      this.$store.dispatch("setRoundStateToTricks");
    },
    editBids() {
      this.$store.dispatch("setRoundStateToBidding");
    },

    submitTricks() {
      this.tricksInvalid = false;

      if (this.currentRoundTricks.reduce((a, b) => a + b) > this.numCardsThisRound) {
        console.log("sad tricks");

        this.tricksInvalid = true;
        return;
      }
      console.log("Happy tricks");
      this.$store.dispatch("addBids", this.currentRoundBids);
      this.$store.dispatch("addTricks", this.currentRoundTricks);

      this.$store.dispatch("goToNextRound");
      this.reset();
    },
    reset() {
      const numPlayers = this.$store.getters.numPlayers;
      this.currentRoundBids = new Array(numPlayers).fill(null);
      this.currentRoundTricks = new Array(numPlayers).fill(null);
    },
  },
  created() {
    this.reset();
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>