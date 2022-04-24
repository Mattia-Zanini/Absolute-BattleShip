<template>
  <div class="row game-menu">
    <div class="col-12">
      <div class="row">
        <!-- GRID -->
        <div class="col-6">
          <table class="grid">
            <tbody>
              <tr v-for="row in 11" :key="row">
                <td v-for="col in 11" :key="col" :class="[
                  { 'no-border': row == 1 || col == 1 },
                  { 'grid-border': row != 1 && col != 1 },
                  { 'blue': CellType('-', row, col) },
                  { 'busy': CellType('s', row, col) },
                ]" :id="GetPos(row, col)" @click="ClickTD">
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
            <div class="col-1 ship-quantity">
              <h3>{{ nCarr }}x</h3>
            </div>
            <div class="col-5">
              <div class="row" id="Carrier" @click="SelectShip">
                <div v-for="shipLength in 5" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1 ship-quantity">
              <h3>{{ nBatt }}x</h3>
            </div>
            <div class="col-4">
              <div class="row" id="Battleship" @click="SelectShip">
                <div v-for="shipLength in 4" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1 ship-quantity">
              <h3>{{ nSub }}x</h3>
            </div>
            <div class="col-3">
              <div class="row" id="Submarine" @click="SelectShip">
                <div v-for="shipLength in 3" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1 ship-quantity">
              <h3>{{ nCru }}x</h3>
            </div>
            <div class="col-2">
              <div class="row" id="Cruiser" @click="SelectShip">
                <div v-for="shipLength in 2" :key="shipLength" class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1 ship-quantity">
              <h3>{{ nDest }}x</h3>
            </div>
            <div class="col-1">
              <div class="row" id="Destroyer" @click="SelectShip">
                <div class="ship"></div>
              </div>
            </div>
          </div>
          <div class="row navigation-section">
            <div class="col-1 rotate-icon" :class="{ 'vertical': this.rotate, 'horizontal': !this.rotate }">
              <h1 class="orientation-text">{{ rot }}</h1>
            </div>
            <div class="col-5">
              <button class="btn btn-style" @click="$emit('exitPreGame', 0, this.RotateListener)">Esci</button>
            </div>
            <div class="col-5">
              <button class="btn btn-style errorClick" id="startbtn" @click="StartGame">Inizia</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AdjustCellValue } from "../JS/Game.js"
export default {
  props: ['rowIndicators', 'player'],
  data() {
    return {
      shipSelected: "",
      rotate: false,
      rot: "H",
      nCarr: 1,
      nBatt: 1,
      nSub: 1,
      nCru: 3,
      nDest: 4,
    }
  },
  methods: {
    StartGame() {
      //remenber to change this line, test mode
      //this.$emit('exitPreGame', 3, this.RotateListener)
      if (this.nCarr + this.nBatt + this.nSub + this.nCru + this.nDest == 0)
        this.$emit('exitPreGame', 3, this.RotateListener)
    },
    CellType(_value, _row, _col) {
      //non passa this.player.grid
      return this.player.CellValue(_value, _row, _col)
    },
    ClickTD(e) {
      let clickedPos = parseInt(e.currentTarget.getAttribute('id'))
      let validate
      //console.log("clickedPos: " + typeof clickedPos)
      if (e.currentTarget.getAttribute('class') == "no-border") {
        console.log("it isn't a valid cell")
        validate = false
      }
      else {
        console.log("Clicked cell in pos: " + clickedPos)
        if (this.shipSelected != "" && !e.currentTarget.getAttribute('class').includes("busy")) {
          if (this.player.ValidatePlacement(clickedPos, { name: this.shipSelected, Length: this.GetShipLength(this.shipSelected) }, this.rotate)) {
            e.currentTarget.classList.add("busy")
            e.currentTarget.classList.remove("blue")
            validate = true
          }
          else
            validate = false
        }
        else if (this.shipSelected == "") {
          console.log("You haven't selected a ship yet")
          validate = false
        }
        else {
          console.log("Cell already busy")
          validate = false
        }
      }
      console.log("CHECKING RESULT: " + validate)
      if (validate == true) {
        let shipLength = this.GetShipLength(this.shipSelected)
        this.DecreaseShips(this.shipSelected)
        this.$emit('update-player', clickedPos, this.shipSelected, shipLength, this.rotate)
        for (let i = 0; i < shipLength; i++) {
          let shipPos
          if (this.rotate == false)
            shipPos = clickedPos + i
          else
            shipPos = clickedPos + i * 10
          var shipElement = document.getElementById(shipPos);
          console.log("ship's element id: " + shipElement.id)
          shipElement.classList.add("busy")
          shipElement.classList.remove("blue")
        }
        if (this.GetShipLeft(this.shipSelected) == 0) {
          var ship = document.getElementById(this.shipSelected);
          ship.classList.remove('selected-' + this.GetShipLength(ship))
          ship.classList.remove('selected')
          console.log("Deselected: " + this.shipSelected)
          this.shipSelected = ""
        }
      }
      if (this.nCarr + this.nBatt + this.nSub + this.nCru + this.nDest == 0) {
        var startBTN = document.getElementById('startbtn');
        startBTN.classList.remove('errorClick')
        console.log("All ships placed")
        console.log(this.player.ships)
      }
    },
    GetPos(_row, _col) {
      return AdjustCellValue(_row, _col)
    },
    SelectShip(e) {
      let classes = e.currentTarget.getAttribute('class')
      let ship = e.currentTarget.getAttribute('id')
      console.log("Clicked: " + ship)
      if (classes.includes("selected") && this.shipSelected != "") {
        e.currentTarget.classList.remove('selected-' + this.GetShipLength(ship))
        e.currentTarget.classList.remove('selected')
        this.shipSelected = ""
        console.log("Deselected: " + ship)
      }
      else if (this.GetShipLeft(ship) > 0) {
        if (this.shipSelected != "") {
          console.log("Deselecting: " + this.shipSelected)
          let oldShip = document.getElementsByClassName('selected')
          //console.log(oldShip[0])
          oldShip[0].classList.remove('selected-' + this.GetShipLength(this.shipSelected))
          oldShip[0].classList.remove('selected')
          console.log("Deselected: " + this.shipSelected)
        }
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
        case "Carrier":
          return this.nCarr
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
        case "Carrier":
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
    RotateListener(e) {
      let key = String.fromCharCode(e.keyCode)
      if (key == 'r') {
        this.rotate = !this.rotate
        console.log("Key pressed: " + key + ", rotate value: " + this.rotate);
        if (this.rotate)
          this.rot = "V"
        else
          this.rot = "H"
      }
    },
    DecreaseShips(_name) {
      console.log("Decreasing ship: " + _name)
      switch (_name) {
        case "Carrier":
          this.nCarr--
          break
        case "Battleship":
          this.nBatt--
          break
        case "Submarine":
          this.nSub--
          break
        case "Cruiser":
          this.nCru--
          break
        case "Destroyer":
          this.nDest--
          break
      }
    },
  },
  mounted() {
    console.log("Grid mounted")
    console.log("EventListener mounted")
    window.addEventListener("keypress", this.RotateListener)
  },
};
</script>

<style scoped>
.errorClick:active {
  animation-name: errorClick;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
}

h3 {
  text-align: center;
  line-height: 2;
  user-select: none;
}

.orientation-text {
  line-height: 4vw;
  text-align: center;
}

.ship-quantity {
  margin-right: 0.6vw;
  margin-bottom: 1vw;
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
  /*margin-bottom: 4.13% !important;*/
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

.btn-style {
  height: 7.5vw;
  width: 14vw !important;
  font-size: 3vw !important;
}

.rotate-icon {
  height: 5vw;
  width: 5vw;
  margin-top: 1.5vw;
  margin-left: 1.4vw;
}

.vertical {
  background-color: #e21919;
  border: 0.3vw solid #7e0f0f;
}

.horizontal {
  background-color: #2ae219;
  border: 0.3vw solid #0f7e21;
}

.navigation-section {
  margin-top: 2%;
}
</style>