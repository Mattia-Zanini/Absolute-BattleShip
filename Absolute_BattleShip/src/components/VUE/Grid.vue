<template>
  <div class="row game-menu">
    <div class="col-12">
      <div class="row">
        <!-- GRID -->
        <div class="col-6">
          <table class="grid">
            <tbody>
              <tr v-for="row in 11" :key="row">
                <td
                  v-for="col in 11"
                  :key="col"
                  :class="[
                    { 'no-border': row == 1 || col == 1 },
                    { 'grid-border': row != 1 && col != 1 },
                    { 'blue': EmptyTD('-', row, col) },
                  ]"
                  :value="GetPos(row, col)"
                  @click="ClickTD"
                >
                  <!--row:{{ row }} col:{{ col }}-->
                  <div class="indicator" v-if="col == 1 && row != 1">{{ rowIndicators[row - 2] }}</div>
                  <div class="indicator" v-if="col != 1 && row == 1">{{ col - 1 }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- SHIPS -->
        <div class="col-6 ships">
          <div class="row">
            <div class="col-1">
              <h3>{{ nAirCarr }}x</h3>
            </div>
            <div class="col-10">
              <div class="row" id="Aircraft Carrier" @click="SelectShip">
                <div v-for="shipLength in 5" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>{{ nBatt }}x</h3>
            </div>
            <div class="col-11">
              <div class="row" id="Battleship" @click="SelectShip">
                <div v-for="shipLength in 4" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>{{ nSub }}x</h3>
            </div>
            <div class="col-11">
              <div class="row" id="Submarine" @click="SelectShip">
                <div v-for="shipLength in 3" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>{{ nCru }}x</h3>
            </div>
            <div class="col-11">
              <div class="row" id="Cruiser" @click="SelectShip">
                <div v-for="shipLength in 2" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3>{{ nDest }}x</h3>
            </div>
            <div class="col-11">
              <div class="row" id="Destroyer" @click="SelectShip">
                <div class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <button class="btn btn-style" @click="$emit('exitPreGame', 0)">Esci</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rowIndicators', 'grid', 'player', 'aldMntd'],
  data() {
    return {
      shipSelected: "",
      rotate: false,
      nAirCarr: 1,
      nBatt: 1,
      nSub: 1,
      nCru: 3,
      nDest: 4,
    };
  },
  methods: {
    EmptyTD(_value, _row, _col) {
      if (_row == 1 || _col == 1)
        return false
      _row = _row - 2
      _col = _col - 2
      let pos = ((_row * 10) + _col)
      if (pos < 0)
        return false
      //console.log("row: " + _row + " col: " + _col + " pos: " + pos);
      //console.log("pos: " + pos)
      if (this.grid[pos] == _value)
        return true
      else
        return false
    },
    ClickTD(e) {
      if (e.currentTarget.getAttribute('class') == "no-border")
        console.log("it isn't a valid cell")
      else
        console.log("Clicked cell in pos: " + e.currentTarget.getAttribute('value'))
      if (this.shipSelected != "" && !e.currentTarget.getAttribute('class').includes("busy")) {
        e.currentTarget.classList.add("busy")
        e.currentTarget.classList.remove("blue")
      }
    },
    GetPos(_row, _col) {
      _row = _row - 2
      _col = _col - 2
      let pos = ((_row * 10) + _col)
      return pos
    },
    SelectShip(e) {
      let classes = e.currentTarget.getAttribute('class')
      let ship = e.currentTarget.getAttribute('id')
      /*let prova = this.wow(name)
      console.log("vediamo se funzia " + prova)*/
      console.log("Clicked: " + ship)
      if (classes.includes("selected") && this.shipSelected != "") {
        e.currentTarget.classList.remove('selected-' + this.GetShipLength(ship))
        e.currentTarget.classList.remove('selected')
        this.shipSelected = ""
        console.log("Deselected: " + ship)
      }
      else if (this.shipSelected == "" && this.GetShipLeft(ship) > 0) {
        this.shipSelected = ship
        e.currentTarget.classList.add('selected')
        e.currentTarget.classList.add('selected-' + this.GetShipLength(ship))
        console.log("Selected: " + ship)
      }
      //console.log("Class: " + e.currentTarget.getAttribute('class'))
    },
    GetShipLeft(_name) {
      console.log("Checking ships left for " + _name)
      switch (_name) {
        case "Aircraft Carrier":
          return this.nAirCarr
        case "Battleship":
          return this.nBatt
        case "Submarine":
          return this.nSub
        case "Cruiser":
          return this.nCru
        case "Destroyer":
          return this.nDest
      }
    },
    GetShipLength(_name) {
      console.log("Getting ships length for " + _name)
      switch (_name) {
        case "Aircraft Carrier":
          return 5
        case "Battleship":
          return 4
        case "Submarine":
          return 3
        case "Cruiser":
          return 2
        case "Destroyer":
          return 1
      }
    },
  },
  mounted() {
    console.log("Grid mounted")
    console.log("EventListener already mounted: " + this.aldMntd)
    if (!this.aldMntd) {
      window.addEventListener("keypress", e => {
        let key = String.fromCharCode(e.keyCode)
        if (key == 'r') {
          this.rotate = !this.rotate
          console.log("Key pressed: " + key + ", rotate value: " + this.rotate);
        }
      });
    }
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  line-height: 2;
  user-select: none;
}
.blue {
  background-color: #2784cf;
}
.game-menu {
  height: 38vw;
  margin: 0 0 0 0 !important;
}
.selected {
  outline: 0.2vw solid yellow !important;
  height: 3vw !important;
  margin-bottom: 4.13% !important;
}
.selected-5 {
  width: 15.8vw !important;
}
.selected-4 {
  width: 12.6vw !important;
}
.selected-3 {
  width: 9.5vw !important;
}
.selected-2 {
  width: 6.3vw !important;
}
.selected-1 {
  width: 3.15vw !important;
}
.busy {
  background-color: #727980;
}
</style>

<!--
<tbody>
    <tr v-for="row in grid">
        <td v-for="cell in row" @click="cellClicked(cell)" :class="cell.class">
            <span v-if="cell.ship">
                <i class="fas fa-ship"></i>
            </span>
            <span v-if="cell.miss">
                <i class="fas fa-times"></i>
            </span>
            <span v-if="cell.hit">
                <i class="fas fa-bomb"></i>
            </span>
        </td>
    </tr>
</tbody>
-->