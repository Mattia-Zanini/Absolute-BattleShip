<template>
    <div class="row game-menu">
        <div class="col-12">
            <div class="row">
                <div class="col-5">
                    <!-- PLAYER GRID -->
                    <table class="grid">
                        <tbody>
                            <tr v-for="row in 11" :key="row">
                                <td v-for="col in 11" :key="col" :class="[
                                    { 'no-border': row == 1 || col == 1 },
                                    { 'grid-border player': row != 1 && col != 1 },
                                    { 'blue': CellType('-', row, col, true) },
                                    { 'busy': CellType('s', row, col, true) },
                                ]" :id="GetPos(row, col)">
                                    <div class="indicator" v-if="col == 1 && row != 1">{{ rowIndicators[row - 2] }}
                                    </div>
                                    <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- NAVIGATION SECTION -->
                <div class="col-2">
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-style" @click="$emit('exitGame', 0)">Esci</button>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <!-- BOT GRID -->
                    <table class="grid">
                        <tbody>
                            <tr v-for="row in 11" :key="row">
                                <td v-for="col in 11" :key="col" :class="[
                                    { 'no-border': row == 1 || col == 1 },
                                    { 'grid-border blue bot': row != 1 && col != 1 }
                                ]" :id="GetPos(row, col)" @click="Attack">
                                    <!--<td v-for="col in 11" :key="col" :class="[
                                    { 'no-border': row == 1 || col == 1 },
                                    { 'grid-border': row != 1 && col != 1 },
                                    { 'blue': CellType('-', row, col, false) },
                                    { 'busy': CellType('s', row, col, false) },
                                ]" :id="GetPos(row, col)">-->
                                    <div class="indicator" v-if="col == 1 && row != 1">{{ rowIndicators[row - 2] }}
                                    </div>
                                    <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AdjustCellValue } from "../JS/Game.js"
export default {
    props: ['rowIndicators', 'bot', 'player'],
    data() {
        return {
            strike: false,
            turn: true,
            winner: "",
            finished: false,
        }
    },
    methods: {
        CellType(_value, _row, _col, _isPlayer) {
            if (!_isPlayer)
                return this.bot.CellValue(_value, _row, _col)
            else
                return this.player.CellValue(_value, _row, _col)
        },
        GetPos(_row, _col) {
            return AdjustCellValue(_row, _col)
        },
        Attack(e) {
            if (!this.finished) {
                if (this.turn) {
                    let cellClasses = e.currentTarget.getAttribute('class')
                    if (!cellClasses.includes("no-border")) {
                        if (!cellClasses.includes("attacked")) {
                            e.currentTarget.classList.add('attacked')
                            let img = document.createElement("img");
                            img.setAttribute("draggable", false);
                            if (this.CheckHit(true, parseInt(e.currentTarget.getAttribute('id')))) {
                                img.src = "./src/assets/images/hitedShip.png"
                                img.classList.add('hitedCell')
                                img.classList.add('hitedShip')
                                e.currentTarget.appendChild(img);

                                this.bot.CheckSunkenShips(parseInt(e.currentTarget.getAttribute('id')));
                            }
                            else {
                                img.src = "./src/assets/images/attackedCell.png"
                                img.classList.add('hitedCell')
                                e.currentTarget.appendChild(img);
                                this.turn = false

                                console.log("BOT'S TURN")
                                this.BotAttack()
                                this.CheckVictory()
                            }
                        }
                        else
                            console.log("Already attacked at position: " + e.currentTarget.getAttribute('id'))
                    }
                }
                else
                    console.log("It's not your turn to attack")
                this.CheckVictory()
            }
        },
        BotAttack() {
            let botStrikes = 0
            while (this.turn == false) {
                if (!this.CheckHit(false, this.bot.Attack(this.player.grid))) {

                    let botMissedCell = document.getElementsByClassName('player')[this.bot.lastAttack]
                    botMissedCell.classList.add('attacked');
                    //console.log(botMissedCell)
                    let botMissedImg = document.createElement("img");
                    botMissedImg.setAttribute("draggable", false);
                    botMissedImg.src = "./src/assets/images/attackedCell.png"
                    botMissedImg.classList.add('hitedCell')
                    botMissedCell.appendChild(botMissedImg);

                    //console.log(this.player.grid)

                    this.turn = true
                    console.log("Bot's strikes: " + botStrikes)
                    console.log("PLAYER'S TURN")
                }
                else {
                    botStrikes++
                    let botHitedCell = document.getElementsByClassName('player')[this.bot.lastAttack]
                    botHitedCell.classList.add('attacked');
                    //console.log(botHitedCell)
                    let botHitImg = document.createElement("img");
                    botHitImg.setAttribute("draggable", false);
                    botHitImg.src = "./src/assets/images/hitedShip.png"
                    botHitImg.classList.add('hitedCell')
                    botHitImg.classList.add('hitedShip')
                    botHitedCell.appendChild(botHitImg)

                    this.player.CheckSunkenShips(this.bot.lastAttack);
                }
            }
        },
        CheckHit(_isPlayer, _hit) {
            if (_isPlayer) {
                console.log("Checking player's hit")
                return this.bot.CheckGrid(_hit)
            }
            else {
                console.log("Checking bot's hit")
                return this.player.CheckGrid(_hit)
            }
        },
        CheckVictory() {
            if (!this.finished) {
                if (this.player.sunkenShips == 10) {
                    console.log("YOU LOSE")
                    this.finished = true
                    this.winner = "bot"
                }
                else if (this.bot.sunkenShips == 10) {
                    console.log("YOU WIN")
                    this.finished = true
                    this.winner = "player"
                }
            }
            if (this.finished) {
                this.$emit('gameFinished', this.winner)
                this.$emit('exitGame', 4)
            }
        },
    },
    mounted() {
        console.log("Game started")
    },
};
</script>
<style scoped>
.game-menu {
    height: 39vw;
    margin: 0 0 0 0 !important;
}

.busy {
    background-color: #727980;
}

.blue {
    background-color: #2784cf;
}

.btn-style {
    font-size: 3.7vw !important;
    width: 15vw !important;
    height: 7.5vw !important;
    margin-left: 0 !important;
    margin-top: 28.5vw !important;
}
</style>