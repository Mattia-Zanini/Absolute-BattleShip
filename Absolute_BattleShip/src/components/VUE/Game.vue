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
                                    { 'blue': CellType('-', row, col) },
                                    { 'busy': CellType('s', row, col) },
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
                                    { 'grid-border': row != 1 && col != 1 },
                                    { 'blue': CellType('-', row, col) },
                                    { 'busy': CellType('s', row, col) },
                                ]" :id="GetPos(row, col)">
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
    props: ['rowIndicators', 'bot'],
    data() {
        return {
        }
    },
    methods: {
        CellType(_value, _row, _col) {
            //non passa this.player.grid
            return this.bot.CellValue(_value, _row, _col)
        },
        GetPos(_row, _col) {
            return AdjustCellValue(_row, _col)
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