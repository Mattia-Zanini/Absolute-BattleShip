export class Ship {
  id;
  name;
  Length;
  isVertical;
  placed;
  positions;
  constructor(_id, _name, _Length) {
    this.id = _id;
    this.name = _name;
    this.Length = _Length;
    this.isVertical = false;
    this.placed = false;
    this.positions = [];
  }
}
// - nothing
// s ship
// m miss
// h hit
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
export class Player {
  name;
  ships;
  grid;
  constructor(_name) {
    this.name = _name;
    this.ships = [];
    /*this.grid = [
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',,
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
    ];*/
    this.grid = [
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
    ];
    //this.StartGrid();
  }
  NewShip(_id, _name, _Length) {
    this.ships.push(new Ship(_id, _name, _Length));
    return this.ships[this.ships.length - 1];
  }
  get AllShips() {
    return this.ships;
  }
  get NumberOfShips() {
    return this.ships.length;
  }
  ResetGrid() {
    this.grid.length = 0;
    for (let i = 0; i < 100; i++) this.grid.push("-");
    console.log("Resetting grid");
    //console.log(this.grid);
  }
  RandomStart() {
    for (let i = 0; i < 1; i++) {
      // Returns a random integer from 0 to 99:
      let rPos = Math.floor(Math.random() * 100);
      console.log("Random position generated: " + rPos);
      if (this.grid[rPos] != '-') {
        i--
        console.log("Position already busy: " + rPos);
        continue // with this the iteration will be skiped
      }
    }
  }
  ValidatePlacement() {
    let carrierCheckHorizontal = [-11, -10, -9, -8, -7, -6, -5, -1, 0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15]
    let carrierCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41, 49, 50, 51]
    let battleshipCheckHorizontal = [-11, -10, -9, -8, -7, -6, -1, 0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14]
    let battleshipCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41]
    let submarineCheckHorizontal = [-11, -10, -9, -8, -7, -1, 0, 1, 2, 3, 9, 10, 11, 12, 13]
    let submarineCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31]
    let cruiserCheckHorizontal = [-11, -10, -9, -8, -1, 0, 1, 2, 9, 10, 11, 12]
    let cruiserCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21]
    let destroyerCheck = [-11, -10, -9, -1, 0, 1, 9, 10, 11]
  }
  /*StartGrid() {
    for (let i = 0; i < 100; i++) this.grid.push("-");
  }*/
}