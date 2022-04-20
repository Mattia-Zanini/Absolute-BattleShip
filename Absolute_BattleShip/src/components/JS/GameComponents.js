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
    let rPos
    let vertical
    for (let i = 0; i < 1; i++) {
      // Returns a random integer from 0 to 99:
      rPos = Math.floor(Math.random() * 100);
      /*You can compare Math.random() to 0.5 directly, as the range of Math.random() is [0, 1) 
      (this means 'in the range 0 to 1 including 0, but not 1').
      You can divide the range into [0, 0.5) and [0.5, 1).*/
      vertical = Math.random() < 0.5;
      console.log("Random position generated: " + rPos);
      console.log("Random orientation generated: " + vertical);
      if (this.ValidatePlacement(rPos, this.ships[i], vertical) == false) {
        i--
        console.log("Position already busy or invalid: " + rPos);
      }
    }
    if (vertical == false) {
      for (let i = 0; i < this.ships[i].Length; i++) {
        this.grid[rPos + i] = 's';
        this.ships[0].positions.push(rPos + i);
      }
    }
    else {
      for (let i = 0; i < this.ships[i].Length; i++) {
        this.grid[rPos + i * 10] = 's';
        this.ships[0].positions.push(rPos + i * 10);
      }
    }
    console.log("Random generation finished");
    console.log(this.ships[0].Length);
    console.log(this.ships[0]);
    console.log(this.grid);
  }
  ValidatePlacement(_pos, _ship, _isVertical) {
    if (this.grid[_pos] != '-')
      return false
    let carrierCheckHorizontal = [-11, -10, -9, -8, -7, -6, -5, -1, 0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15]
    let carrierCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41, 49, 50, 51]
    let battleshipCheckHorizontal = [-11, -10, -9, -8, -7, -6, -1, 0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14]
    let battleshipCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41]
    let submarineCheckHorizontal = [-11, -10, -9, -8, -7, -1, 0, 1, 2, 3, 9, 10, 11, 12, 13]
    let submarineCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21, 29, 30, 31]
    let cruiserCheckHorizontal = [-11, -10, -9, -8, -1, 0, 1, 2, 9, 10, 11, 12]
    let cruiserCheckVertical = [-11, -10, -9, -1, 0, 1, 9, 10, 11, 19, 20, 21]
    let destroyerCheck = [-11, -10, -9, -1, 0, 1, 9, 10, 11]

    let checkPosH = _pos % 10
    console.log("Position value on row: " + checkPosH)
    let checkPosV = (_pos - checkPosH) / 10
    console.log("Position value on col: " + checkPosV)
    let checkValue = 10 - _ship.Length
    console.log("Checking if " + _ship.name + " can be placed at " + _pos + " with length " + _ship.Length + " and orientation " + _isVertical)
    console.log("Control value: " + checkValue)
    if (checkPosH > checkValue && _isVertical == false) {
      console.log("Horizontal control, invalid position")
      return false
    }
    if (checkPosV > checkValue && _isVertical == true) {
      console.log("Vertical control, invalid position")
      return false
    }
    switch (_ship.Length) {
      case 5:
        if (_isVertical) {
          for (let i = 0; i < carrierCheckVertical.length; i++) {
            console.log("Checking pos: " + (carrierCheckVertical[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, carrierCheckVertical[i])] != '-')
              return false
          }
          return true
        }
        else {
          for (let i = 0; i < carrierCheckHorizontal.length; i++) {
            console.log("Checking pos: " + (carrierCheckHorizontal[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, carrierCheckHorizontal[i])] != '-')
              return false
          }
          return true
        }
      case 4:
        if (_isVertical) {
          for (let i = 0; i < battleshipCheckVertical.length; i++) {
            console.log("Checking pos: " + (battleshipCheckVertical[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, battleshipCheckVertical[i])] != '-')
              return false
          }
          return true
        }
        else {
          for (let i = 0; i < battleshipCheckHorizontal.length; i++) {
            console.log("Checking pos: " + (battleshipCheckHorizontal[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, battleshipCheckHorizontal[i])] != '-')
              return false
          }
          return true
        }
      case 3:
        if (_isVertical) {
          for (let i = 0; i < submarineCheckVertical.length; i++) {
            console.log("Checking pos: " + (submarineCheckVertical[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, submarineCheckVertical[i])] != '-')
              return false
          }
          return true
        }
        else {
          for (let i = 0; i < submarineCheckHorizontal.length; i++) {
            console.log("Checking pos: " + (submarineCheckHorizontal[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, submarineCheckHorizontal[i])] != '-')
              return false
          }
          return true
        }
      case 2:
        if (_isVertical) {
          for (let i = 0; i < cruiserCheckVertical.length; i++) {
            console.log("Checking pos: " + (cruiserCheckVertical[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, cruiserCheckVertical[i])] != '-')
              return false
          }
          return true
        }
        else {
          for (let i = 0; i < cruiserCheckHorizontal.length; i++) {
            console.log("Checking pos: " + (cruiserCheckHorizontal[i] + _pos))
            if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, cruiserCheckHorizontal[i])] != '-')
              return false
          }
          return true
        }
      case 1:
        for (let i = 0; i < destroyerCheck.length; i++) {
          console.log("Checking pos: " + (destroyerCheck[i] + _pos))
          if (this.grid[this.ValidateCheck(_pos, _ship.Length, _isVertical, destroyerCheck[i])] != '-')
            return false
        }
        return true
    }
  }
  ValidateCheck(_posToPlace, _lenght, _isVertical, _check) {
    console.log("Validating position: " + _posToPlace + " with check: " + _check)
    let posToCheck = _posToPlace + _check
    console.log("Position to check: " + posToCheck)
    console.log("Position + Length: " + (_posToPlace + _lenght))
    //OUT OF THE GRID
    if (posToCheck < 0 || posToCheck > 99) {
      console.log("Out of bounds " + (posToCheck))
      return _posToPlace
    }
    //LEFT Horizontal & Vertical
    if (_posToPlace % 10 == 0 && posToCheck % 10 == 9) {
      console.log("Border left, position that does not need to be checked: " + (posToCheck))
      return _posToPlace
    }
    //HORIZONTAL
    if (_isVertical == false) {
      //RIGHT
      if ((_posToPlace + _lenght) % 10 == 0 && posToCheck % 10 == 0) {
        console.log("Border right horizontal, position that does not need to be checked: " + (posToCheck))
        return _posToPlace
      }
    }
    //VERTICAL
    else {
      //RIGHT
      if (_posToPlace % 10 == 9 && posToCheck % 10 == 0) {
        console.log("Border right vertical, position that does not need to be checked: " + (posToCheck))
        return _posToPlace
      }
    }
    return posToCheck
  }
  /*StartGrid() {
    for (let i = 0; i < 100; i++) this.grid.push("-");
  }*/
}