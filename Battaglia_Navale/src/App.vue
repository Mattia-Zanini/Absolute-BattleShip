<script setup>
import { Game } from "./components/JS/Game.js";
Game();
</script>

<template>
  <div class="container-fluid">
    <!-- APP -->
    <div class="row">
      <h1 class="title-h1">Battleship</h1>
    </div>
    <div class="row">
      <div class="col-4 detail-game">
        <DetailGame />
      </div>
      <div class="col-8"></div>
    </div>
  </div>
</template>

<script>
import DetailGame from "./components/VUE/DetailGame.vue";
export default {
  /*
  // Properties returned from data() becomes reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

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
  }
};
</script>