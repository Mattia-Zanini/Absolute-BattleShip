<script setup>
import { Player } from "./components/JS/Game.js";
// ships featured in the game
let ships = [
  {
    name: "Aircraft Carrier",
    size: 5,
  },
  {
    name: "Battleship",
    size: 4,
  },
  {
    name: "Submarine",
    size: 3,
  },
  {
    name: "Cruiser",
    size: 2,
  },
  {
    name: "Destroyer",
    size: 1,
  },
];
const giocatore = new Player("Giocatore");
const bot = new Player("BOT");
//create 10 ships for each player
for (let i = 0; i < 10; i++) {
  if (i < 3) { giocatore.newShip(i, ships[i].name, ships[i].size); bot.newShip(i, ships[i].name, ships[i].size); }
  if (i > 2 && i < 6) { giocatore.newShip(i, ships[3].name, ships[3].size); bot.newShip(i, ships[3].name, ships[3].size); }
  if (i > 5 && i < 10) { giocatore.newShip(i, ships[4].name, ships[4].size); bot.newShip(i, ships[4].name, ships[4].size); }
}
console.log(giocatore);
console.log(bot);
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
    console.log(`Correctrly mounted`);
  },
  components: {
    DetailGame,
  },
};
</script>