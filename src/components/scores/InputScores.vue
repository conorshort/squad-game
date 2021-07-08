<template>
  <base-card>
    <h1>Round {{ currentRound }}</h1>
    <h3>{{ numCards }} cards, {{ suit }}</h3>
    <div class="container">
      <h3 v-if="roundState === 'bidding'">Enter bids:</h3>
      <h3 v-if="roundState === 'tricks'">Enter tricks:</h3>
      <PlayerInput
        v-for="(player, idx) in players"
        :key="player.name"
        :numCards="numCards"
        :name="player.name"
        v-model:bid.number="currentRoundBids[idx]"
        :bidInvalid="currentRoundBids[idx] === null && showErrors"
        v-model:tricks.number="currentRoundTricks[idx]"
      />
    </div>
    <div class="container totals">
      <div>
        <p>
          Total bids: {{ totalBids }}
          <base-button
            :outline="true"
            :small="true"
            v-if="roundState === 'tricks'"
            @click="editBids"
          >
            Edit bids
          </base-button>
        </p>
      </div>
      <div>
        <p>Total tricks: {{ totalTricks }}</p>
      </div>
    </div>

    <base-button
      v-if="roundState === 'bidding'"
      @click="submitBids"
      :disabled="!bidsValid"
    >
      Submit bids
    </base-button>

    <base-button
      v-if="roundState === 'tricks'"
      @click="submitTricks"
      :disabled="!tricksValid"
    >
      Submit tricks
    </base-button>
  </base-card>
</template>

<script>
import PlayerInput from "./PlayerInput";
export default {
  components: {
    PlayerInput,
  },
  data() {
    return {
      currentRoundBids: null,
      currentRoundTricks: null,
      showErrors: false,
    };
  },
  computed: {
    players() {
      return this.$store.getters.players;
    },
    numCards() {
      return this.$store.getters.numCardsThisRound;
    },
    suit() {
      const suits = this.$store.getters.suits;
      return suits[(this.currentRound - 1) % suits.length];
    },
    currentRound() {
      return this.$store.getters.currentRound;
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
    bidsValid() {
      return !this.currentRoundBids.some((bid) => bid === null);
    },
    tricksValid() {
      return this.totalTricks === this.numCardsThisRound;
    },
  },
  methods: {
    submitBids() {
      if (!this.bidsValid) {
        this.showErrors = true;
        return;
      }
      console.log("Happy bids");

      // this.$store.dispatch( "addBids", this.currentRoundBids);
      this.showErrors = false;

      this.$store.dispatch("setRoundStateToTricks");
    },
    editBids() {
      this.$store.dispatch("setRoundStateToBidding");
    },

    submitTricks() {
      this.tricksInvalid = false;

      if (!this.tricksValid) {
        console.log("sad tricks");

        this.showErrors = true;
        return;
      }
      console.log("Happy tricks");
      this.showErrors = false;

      this.$store.dispatch("addBids", this.currentRoundBids);
      this.$store.dispatch("addTricks", this.currentRoundTricks);

      this.$store.dispatch("goToNextRound");
      this.reset();
      this.$store.dispatch("saveToLocalStorage");
    },
    reset() {
      this.showErrors = false;
      const numPlayers = this.$store.getters.numPlayers;
      this.currentRoundBids = new Array(numPlayers).fill(null);
      this.currentRoundTricks = new Array(numPlayers).fill(null);
    },
  },
  created() {
    console.log(this.$store.getters.numPlayers);
    if(!this.$store.getters.numPlayers) {
      this.$router.push('/')
    }
    this.reset();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.container.totals {
  max-width: 500px;
  justify-content: space-around;
  margin: auto;
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }
}
</style>