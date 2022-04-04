export class Ship {
  id;
  name;
  Length;
  isVertical;
  isSelected;
  constructor(_id, _name, _Length) {
    this.id = _id;
    this.name = _name;
    this.Length = _Length;
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
    this.grid = [];
    this.StartGrid();
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
  StartGrid() {
    for (let i = 0; i < 100; i++) this.grid.push("-");
  }
}
