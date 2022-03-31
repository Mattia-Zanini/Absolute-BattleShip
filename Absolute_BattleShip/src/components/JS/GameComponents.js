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
export class Player {
  name;
  ships;
  constructor(_name) {
    this.name = _name;
    this.ships = [];
  }
  newShip(_id, _name, _Length) {
    this.ships.push(new Ship(_id, _name, _Length));
    return this.ships[this.ships.length - 1];
  }
  get allShips() {
    return this.ships;
  }
  get numberOfShips() {
    return this.ships.length;
  }
}
