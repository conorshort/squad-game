export default class {

    constructor(playerName, scores = {}) {
        this.name = playerName;
        this.scores = scores
    }

    addTricks(roundNumber, tricks) {
        this.scores[roundNumber] = this.scores[roundNumber] || {};
        this.scores[roundNumber]['tricks'] = tricks;
    }

    addBid(roundNumber, bid) {
        this.scores[roundNumber] = this.scores[roundNumber] || {};
        this.scores[roundNumber]['bid'] = bid;

    }
    static fromObj(obj) {
        return new this(obj.name, obj.scores)
    }

    get totalScore() {
        let totalScore = 0;
        for (const round in this.scores) {
            totalScore += this.scores[round]['tricks'];

            if (this.scores[round]['tricks'] === this.scores[round]['bid']) {
                totalScore += 10;
            }
        }
        return totalScore;
    }


    getTotalScoreAtRound(roundArg) {
        let totalScore = 0;
        for (const round in this.scores) {
            if (round <= roundArg) {
                totalScore += this.scores[round]['tricks'];

                if (this.scores[round]['tricks'] === this.scores[round]['bid']) {
                    totalScore += 10;
                }
            }
        }
        return totalScore;
    }

    get json() {
        return JSON.stringify(this);
    }

    get totalTricksWon() {
        let totalTricks = 0;
        for (const round in this.scores) {
            totalTricks += this.scores[round]['tricks'];
        }
        return totalTricks;
    }

    get totalBidsMade() {
        let totalBids = 0;
        for (const round in this.scores) {
            totalBids += this.scores[round]['bid'];
        }
        return totalBids;
    }

    get totalCorrectBids() {
        let correctBids = 0;

        for (const round in this.scores) {

            if (this.scores[round]['tricks'] === this.scores[round]['bids']) {
                correctBids++;
            }
        }
        return correctBids;
    }

    get totalZeroBids() {
        let zeroBids = 0;

        for (const round in this.scores) {

            if (this.scores[round]['bids'] === 0) {
                zeroBids++;
            }
        }
        return zeroBids;
    }

}