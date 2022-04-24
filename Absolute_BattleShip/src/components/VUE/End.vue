<template>
  <div class="row game-menu">
    <div class="col-12">
      <div class="row">
        <h1 class="text-center winner-name">Il vincitore e' :<br />{{ winn }}</h1>
      </div>
      <div class="row">
        <button class="btn btn-style" @click="$emit('exit', 0)">Esci</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['winn'],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    console.log("Winner section mounted");
  },
};
</script>

<style scoped>
.winner-name {
  margin-top: 2vw;
  margin-bottom: 1vw;
  font-size: 3vw;
}
</style>