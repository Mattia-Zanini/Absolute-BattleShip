<script setup>
import { Game, giocatore, bot } from "./components/JS/Game.js";
Game();
const rIndi = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const alreadyMounted = false;
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
      <Grid
        @exitPreGame="showMenu"
        :rowIndicators="rIndi"
        :grid="giocatore.grid"
        :player="giocatore"
        :aldMntd="alreadyMounted"
      />
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
      console.log("This is show's value: " + this.show);
      if (_value == 0)
        this.alreadyMounted = true;
    },
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log("App Correctly mounted");
  },
  components: {
    DetailGame, Grid, GameMenu,
  },
};
</script>