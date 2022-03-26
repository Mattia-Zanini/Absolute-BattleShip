<script setup>
/*import { Ship, Barca } from './ship.js';
const s = new Ship("Assalto", 1900);
const b = new Barca("Portaerei", 1900);
console.log(s);
console.log(b);*/
</script>

<template>
  <div class="container-fluid">
    <!-- APP -->
    <div class="row">
      <div class="col-12 title">
        <h1 class="title-h1">Battleship</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*// Properties returned from data() becomes reactive state
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
    console.log(`Correctrly mounted`)
  }
}
</script>