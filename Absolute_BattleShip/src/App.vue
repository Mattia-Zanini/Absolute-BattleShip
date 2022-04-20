<script setup>
import { StartGame, giocatore, bot } from "./components/JS/Game.js";
StartGame();
const rIndi = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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
      <Grid @exitPreGame="showMenu" :rowIndicators="rIndi" :player="giocatore" @update-player="updatePlayer" />
    </div>
    <div v-if="show == 3" class="row d-flex justify-content-center zoomin">
      <Game @exitGame="showMenu" :rowIndicators="rIndi" :bot="bot" />
    </div>
  </div>
</template>

<script>
import DetailGame from "./components/VUE/DetailGame.vue";
import Grid from "./components/VUE/Grid.vue";
import GameMenu from "./components/VUE/GameMenu.vue";
import Game from "./components/VUE/Game.vue";
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
    showMenu(_value, _handler) {
      this.show = _value;
      console.log("This is show's value: " + this.show);
      if (_value == 0) {
        this.giocatore.ResetGrid();
        this.bot.ResetGrid();
        console.log("EventListener removed: " + _handler);
        window.removeEventListener("keypress", _handler)

        for (let i = 0; i < this.giocatore.NumberOfShips; i++) {
          this.giocatore.ships[i].isVertical = false;
          this.giocatore.ships[i].placed = false;
          this.giocatore.ships[i].positions.length = 0;
        }
        //console.log(this.giocatore.ships)
      }
      if(_value == 3){
        this.bot.RandomStart();
      }
    },
    updatePlayer(_pos, _ship, _length, _orientation) {
      console.log("Grid updated");
      let orient = _orientation == true ? "Vertical" : "Horizontal";
      console.log("Insert ship with this value: \nPosition: " + _pos + "\nShip: " + _ship + "\nLenght: " + _length + "\nOrientation: " + orient);

      console.log("Updating for " + _ship)
      let ship = this.FindShip(_ship);
      console.log("Ship find in pos " + ship)
      this.giocatore.ships[ship].isVertical = _orientation;
      this.giocatore.ships[ship].placed = true;

      if (_orientation == false) {
        for (let i = 0; i < _length; i++) {
          this.giocatore.grid[_pos + i] = 's';
          this.giocatore.ships[ship].positions.push(_pos + i);
        }
      }
      else {
        for (let i = 0; i < _length; i++) {
          this.giocatore.grid[_pos + i * 10] = 's';
          this.giocatore.ships[ship].positions.push(_pos + i * 10);
        }
      }
      console.log(this.giocatore.grid)
      console.log("Ship updated:")
      console.log(this.giocatore.ships[ship])
    },
    FindShip(_name) {
      console.log("Finding ship")
      for (let i = 0; i < this.giocatore.NumberOfShips; i++) {
        if (this.giocatore.ships[i].name == _name && this.giocatore.ships[i].placed == false) {
          console.log("Finding ship: success")
          return i;
        }
      }
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log("App Correctly mounted");
  },
  components: {
    DetailGame, Grid, GameMenu, Game,
  },
};
</script>