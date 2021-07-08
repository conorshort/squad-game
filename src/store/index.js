import { createStore } from "vuex";
import Player from '../player'
export default createStore({
  state: {
    numPlayers: null,
    playerNames: [],
    players: [],
    currentRound: 1,
    currentRoundState: 'bidding',
    suits: ['♣', '♦', '♥', '♠', '∅'],
    startTime: new Date().getTime(),
    completed: false,
  },
  getters: {
    numPlayers(state) {
      return state.numPlayers;
    },
    players(state) {
      return state.players;
    },
    currentRound(state) {
      return state.currentRound;
    },
    currentRoundState(state) {
      return state.currentRoundState;
    },
    suits(state) {
      return state.suits;
    },
    numCardsThisRound(state) {
      const numPlayers = state.numPlayers
      const maxCards = Math.floor(52 / numPlayers);
      let numCards = Math.abs(maxCards - ((state.currentRound - 1) % (maxCards * 2)));
      if (numCards === 0) {
        numCards = 1;
      }
      return numCards;
    },

  },

  mutations: {

    setNumPlayers() {

    },
    incrementRound(state) {
      state.currentRound++;
    },
    createPlayers(state) {
      state.playerNames.forEach(playerName => {
        state.players.push(new Player(playerName))

      });
      console.log(state.players);
    },

    addTricks(state, tricksForRound) {
      // console.log("tricksForRound");
      // console.log(tricksForRound);
      state.players.forEach((player, idx) => {
        player.addTricks(state.currentRound, tricksForRound[idx])
      });
    },
    addBids(state, bidsForRound) {
      // console.log("bidsForRound");
      // console.log(bidsForRound);
      state.players.forEach((player, idx) => {
        player.addBid(state.currentRound, bidsForRound[idx])
      });
    },
    addTricksToPlayer(state, payload) {
      const player = state.players.find(player => payload.playerName === player.name);
      player.addTricks(state.currentRound, payload.tricks)
    },
    addBidToPlayer(state, payload) {
      const player = state.players.find(player => payload.playerName === player.name);
      player.addBid(state.currentRound, payload.bid)
    },

    setCurrentRoundState(state, roundState) {
      state.currentRoundState = roundState;
    }


  },
  actions: {
    setUp(context) {
      context.commit('createPlayers');
    },
    goToNextRound(context) {
      context.commit('incrementRound');
      context.commit('setCurrentRoundState', 'bidding');
    },

    addTricks(context, payload) {
      context.commit('addTricks', payload);
    },

    addBids(context, payload) {
      context.commit('addBids', payload);
    },

    addTricksToPlayer(context, payload) {
      context.commit('addTricksToPlayer', payload);
    },
    addBidToPlayer(context, payload) {
      context.commit('addBidToPlayer', payload);
    },
    setRoundStateToBidding(context) {
      context.commit('setCurrentRoundState', 'bidding');
    },
    setRoundStateToTricks(context) {
      context.commit('setCurrentRoundState', 'tricks');

    },
    saveToLocalStorage(context) {
      console.log("saving")
      console.log(context)

      const gameObj = {
        startTime: context.state.startTime,
        playerNames: context.state.playerNames,
        players: context.state.players,
        completed: context.state.completed,
        currentRound: context.state.currentRound,
        currentRoundState: context.state.currentRoundState
      }

      localStorage.setItem("squadgame--" + gameObj.startTime, JSON.stringify(gameObj));

    },
    loadFromLocalStorage(context, gameId) {


      const gameObj = JSON.parse(localStorage["squadgame--" + gameId]);
      gameObj.players = gameObj.players.map(player => Player.fromObj(player));


      context.state.startTime = gameObj.startTime;
      context.state.players = gameObj.players;
      context.state.playerNames = gameObj.playerNames;
      context.state.numPlayers = gameObj.players.length;

      context.state.completed = gameObj.completed;
      context.state.currentRound = gameObj.currentRound;
      context.state.currentRoundState = gameObj.currentRoundState;



    },
    startNewGame(context, payload) {
      const playerNames = payload.playerNames;

      context.state.startTime = new Date().getTime();
      context.state.players = []
      context.state.playerNames = playerNames;
      context.commit("createPlayers");
      context.state.numPlayers = context.state.playerNames.length;

      context.state.completed = false;
      context.state.currentRound = 1;
      context.state.currentRoundState = 'bidding';
    }
  },
  modules: {},
});
