<template>
    <div class="col-12 game-menu">
        <div class="row">
            <button class="btn btn-style">Gioca</button>
        </div>
        <div class="row">
            <button class="btn btn-style" @click="$emit('hideMenu', 1)">Regole</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
