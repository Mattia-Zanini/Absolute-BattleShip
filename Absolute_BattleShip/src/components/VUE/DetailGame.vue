<template>
    <div class="col-12 game-menu">
        <div class="row detail-game">
            <h4>
                Gioca all'emozionante Battaglia navale contro un bot. Scopri chi e' il piu' forte
                <br />
                <br />Regole
                <br />
                <br />Hai a disposizione un set di navi da disporre sulla griglia.
                <br />
                <br />Durante il tuo turno hai a disposzione 1 colpo,
                con il quale puoi cercare di affondare le navi avversarie,
                pero' se riesci a colpire o ad affondare una nave nemica puoi
                effettuare un altro colpo.
            </h4>
        </div>
        <div class="row">
            <button class="btn btn-style" @click="$emit('hideRules', 0)">Esci</button>
        </div>
    </div>
</template>

<style scoped>
.game-menu {
    height: 30vw;
    margin: 2% 0 0 0 !important;
}
</style>