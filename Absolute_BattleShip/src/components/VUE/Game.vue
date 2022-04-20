<template>
    <div class="row game-menu">
        <div class="col-12">
            <div class="row">
                <table class="grid">
                    <tbody>
                        <tr v-for="row in 11" :key="row">
                            <!--<td v-for="col in 11" :key="col" :class="[
                                { 'no-border': row == 1 || col == 1 },
                                { 'grid-border': row != 1 && col != 1 },
                                { 'blue': EmptyTD('-', row, col) },
                                { 'busy': EmptyTD('s', row, col) },
                            ]" :id="GetPos(row, col)" :value="GetPos(row, col)" @click="ClickTD">-->
                            <td v-for="col in 11" :key="col" :class="[
                                { 'no-border': row == 1 || col == 1 },
                                { 'grid-border blue': row != 1 && col != 1 }
                            ]">
                                <div class="indicator" v-if="col == 1 && row != 1">{{ rowIndicators[row - 2] }}</div>
                                <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['rowIndicators', 'bot'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        //console.log(this.bot)
        this.bot.RandomStart()
    },
};
</script>
<style scoped>
.game-menu {
    height: 39vw;
    margin: 0 0 0 0 !important;
}

.blue {
    background-color: #2784cf;
}
</style>