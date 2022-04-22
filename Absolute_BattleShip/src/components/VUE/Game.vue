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
                                    { 'grid-border': row != 1 && col != 1 },
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
                <div class="col-2">
                    <div class="row">
                        <div class="col-12">
                        </div>
                    </div>
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
                                    { 'grid-border blue': row != 1 && col != 1 }
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
            let cellClasses = e.currentTarget.getAttribute('class')
            if(!cellClasses.includes("no-border")){
                if (!cellClasses.includes("attacked")) {
                e.currentTarget.classList.add('attacked')
                let img = document.createElement("img");
                img.setAttribute("draggable", false);
                if (this.CheckHit(true, parseInt(e.currentTarget.getAttribute('id')))) {
                    console.log("A SHIP HAS BEEN HITED")

                    img.src = "./src/assets/images/hitedShip.png"
                    img.classList.add('hitedCell')
                    img.classList.add('hitedShip')
                    e.currentTarget.appendChild(img);
                }
                else {
                    img.src = "./src/assets/images/attackedCell.png"
                    img.classList.add('hitedCell')
                    e.currentTarget.appendChild(img);
                }
            }
            else
                console.log("Already attacked at position: " + e.currentTarget.getAttribute('id'))
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
    },
    mounted() {
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