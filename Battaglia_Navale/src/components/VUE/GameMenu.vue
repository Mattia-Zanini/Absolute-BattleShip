<template>
    <div class="game-menu">
        <div class="row">
            <button class="btn btn-style">Gioca</button>
        </div>
        <div class="row">
            <button class="btn btn-style" @click="$emit('hideMenu')">Esci</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-style {
    width: 50%;
    margin: 2% 0 0 25% !important;
}
</style>
