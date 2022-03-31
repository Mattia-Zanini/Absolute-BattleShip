<script setup>
import { Game } from "./components/JS/Game.js";
Game();
const show = false;
</script>

<template>
  <div class="container-fluid">
    <!-- APP -->
    <div class="row">
      <h1 class="title-h1">Battleship</h1>
    </div>
    <div class="row">
      <div class="col-5 detail-game">
        <DetailGame />
      </div>
      <div class="col-6 d-flex justify-content-center">
        <button class="btn start" @click="show = !show">Gioca</button>
      </div>
      <GameMenu />
    </div>
  </div>
</template>

<script>
import DetailGame from "./components/VUE/DetailGame.vue";
import Grid from "./components/VUE/Grid.vue";
import GameMenu from "./components/VUE/GameMenu.vue";
export default {
  // Properties returned from data() becomes reactive state
  // and will be exposed on `this`.
  data() {
    return {
      row: 0,
      col: 0,
    };
  },
  /*
    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods: {
      increment() {
        this.count++
      }
    },*/

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log("App Correctrly mounted");
  },
  components: {
    DetailGame,
  },
};
</script>