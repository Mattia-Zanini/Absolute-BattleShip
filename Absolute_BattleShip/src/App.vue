<script setup>
import { Game } from "./components/JS/Game.js";
Game();
const rIndi = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// - nothing
// s player's ship
// m player's miss
// h player's hit
// p pc's ship
// n pc's miss
// i pc's hit
/*
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
*/
const grid = [];
for (let i = 0; i < 100; i++)
  grid.push('-');
console.log(grid);
</script>

<template>
  <div class="container-fluid">
    <!-- APP -->
    <div class="row">
      <h1 class="title-h1">Absolute Battleship</h1>
    </div>
    <div v-if="show == 0" class="row d-flex justify-content-center zoomin">
      <GameMenu @hideMenu="showMenu" />
    </div>
    <div v-if="show == 1" class="row d-flex justify-content-center zoomin">
      <DetailGame @hideRules="showMenu" />
    </div>
    <div v-if="show == 2" class="row d-flex justify-content-center zoomin">
      <Grid @exitPreGame="showMenu" :rowIndicators="rIndi" />
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
      show: 0,
    };
  },
  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    showMenu(_value) {
      this.show = _value;
      console.log("Questo è il valore di show " + this.show);
    },
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log("App Correctrly mounted");
  },
  components: {
    DetailGame, Grid, GameMenu,
  },
};
</script>