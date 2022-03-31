<script setup>
import { Game } from "./components/JS/Game.js";
Game();
</script>

<template>
  <div class="container-fluid">
    <!-- APP -->
    <div class="row">
      <h1 class="title-h1">Absolute Battleship</h1>
    </div>
    <!--<div class="row" v-if="!show">
      <div class="col-5 detail-game">
        <DetailGame />
      </div>
      <div class="col-6 d-flex justify-content-center">
        <button class="btn btn-style" @click="showMenu">Nuova Partita</button>
      </div>
    </div>-->
    <div v-if="show == 0" class="row d-flex justify-content-center zoomin">
      <GameMenu @hideMenu="showMenu" />
    </div>
    <div v-if="show == 1" class="row d-flex justify-content-center zoomin">
      <DetailGame @hideRules="showMenu" />
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
    DetailGame,
  },
};
</script>