export class Ship {
  id;
  name;
  Length;
  isVertical;
  placed;
  positions;
  hit;
  sunken;
  constructor(_id, _name, _Length) {
    this.id = _id;
    this.name = _name;
    this.Length = _Length;
    this.isVertical = false;
    this.placed = false;
    this.positions = [];
    this.hit = 0;
    this.sunken = false;
  }
  ResetShip() {
    this.isVertical = false;
    this.placed = false;
    this.positions.length = 0;
    this.hit = 0;
    this.sunken = false;
  }
}

export class Player {
  name;
  ships;
  grid;
  sunkenShips;
  lastAttack;
  lastAttackedShip;
  nearbyArea;
  positionsNotToHit;
  constructor(_name) {
    this.name = _name;
    this.sunkenShips = 0;
    this.nearbyArea = [1, -1, 10, -10]
    this.positionsNotToHit = [];
    this.ships = [];
    this.grid = [
      // - nothing
      // s ship
      // m miss
      // h hit
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
  Reset() {
    this.grid.length = 0;
    console.log("Resetting " + this.name + "'s grid and attributes");
    for (let i = 0; i < 100; i++) this.grid.push("-");
    this.sunkenShips = 0;
    this.lastAttack = null;
    console.log("Resetting " + this.name + "'s ships");
    for (let i = 0; i < this.NumberOfShips; i++) {
      this.ships[i].ResetShip();
    }
    //console.log(this.grid);
  }
  RandomStart() {
    for (let i = 0; i < this.NumberOfShips; i++) {
      console.log("I value: " + i)
      // Returns a random integer from 0 to 99:
      let rPos = Math.floor(Math.random() * 100);
      /*You can compare Math.random() to 0.5 directly, as the range of Math.random() is [0, 1) 
      (this means 'in the range 0 to 1 including 0, but not 1').
      You can divide the range into [0, 0.5) and [0.5, 1).*/
      let vertical = Math.random() < 0.5;
      console.log("Random position generated: " + rPos);
      console.log("Random orientation generated: " + vertical);
      if (this.ValidatePlacement(rPos, this.ships[i], vertical) == false) {
        i--
        console.log("Position already busy or invalid: " + rPos);
        console.log("Trying again\nI value before trying: " + i)
      }
      else {
        this.ships[i].placed = true;
        this.ships[i].isVertical = vertical;
        if (vertical == false) {
          for (let j = 0; j < this.ships[i].Length; j++) {
            this.grid[rPos + j] = 's';
            this.ships[i].positions.push(rPos + j);
          }
        }
        else {
          for (let j = 0; j < this.ships[i].Length; j++) {
            this.grid[rPos + j * 10] = 's';
            this.ships[i].positions.push(rPos + j * 10);
          }
        }
      }
    }
    console.log("Random generation finished");
    console.log(this.ships);
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
  CellValue(_value, _row, _col) {
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
  }
  CheckGrid(_pos) {
    console.log("Checking hit at: " + _pos)
    if (this.grid[_pos] == 's') {
      for (let i = 0; i < this.NumberOfShips; i++) {
        for (let j = 0; j < this.ships[i].Length; j++) {
          if (this.ships[i].positions[j] == _pos) {
            this.ships[i].hit++
            console.log("Hitted a ship at position: " + _pos)
            this.grid[_pos] = 'h'
          }
        }
      }
      return true
    }
    else {
      this.grid[_pos] = 'm'
      return false
    }
  }
  Attack(_enemysGrid) {
    console.log("Enemy's grid:\n" + _enemysGrid)
    if (this.lastAttack == undefined)
      console.log("Last attack not registered yet")
    else {
      console.log("Last attack already registered with value: " + this.lastAttack)
      console.log("Enemy grid in pos last attack is: " + _enemysGrid[this.lastAttack])
    }
    if (this.lastAttackedShip == undefined)
      return this.RandomAttack(_enemysGrid);
    return this.NearbyAttack(_enemysGrid)
  }
  RandomAttack(_enemysGrid) {
    console.log("Random Attack")
    let isValid = false
    let attck
    do {
      attck = Math.floor(Math.random() * 100)
      console.log("Attacking position: " + attck)
      console.log("Enemy's grid value: " + _enemysGrid[attck])
      if (_enemysGrid[attck] == 'm' || _enemysGrid[attck] == 'h' || this.DoNotHitHere(attck, true, _enemysGrid)) {
        console.log("Already attacked position: " + attck)
        isValid = false
      }
      else
        isValid = true
    } while (isValid == false)
    //console.log("Saving lastAttack")
    this.lastAttack = attck
    if (_enemysGrid[attck] == 's') {
      this.lastAttackedShip = attck
    }
    return attck
  }
  NearbyAttack(_enemysGrid) {
    console.log("Nearby Attack")
    let nearby
    console.log("Deleting uneccessary pos, start value: " + this.nearbyArea.length)
    for (let i = 0; i < this.nearbyArea.length; i++) {
      let nerb = this.nearbyArea[i] + this.lastAttackedShip
      if (nerb < 0 || nerb > 99 || _enemysGrid[nerb] == 'm' || _enemysGrid[nerb] == 'h' || this.BorderAttackCheck(nerb) || this.DoNotHitHere(nerb, true, _enemysGrid)) {
        this.nearbyArea.splice(i, 1)
        i--
      }
    }
    console.log("End value: " + this.nearbyArea.length)
    if (this.nearbyArea.length == 0) {
      this.nearbyArea = [1, -1, 10, -10]
      this.lastAttackedShip = undefined
      nearby = this.RandomAttack(_enemysGrid);
      console.log("Random Attack with no nearby cell to check")
    }
    else {
      let rand = Math.floor(Math.random() * this.nearbyArea.length)
      nearby = this.nearbyArea[rand] + this.lastAttackedShip
      console.log("Rand value: " + rand)
      console.log("Value extracted: " + this.nearbyArea[rand])
      console.log("Nearby cell is: " + nearby)
      this.nearbyArea.splice(rand, 1)
      this.lastAttack = nearby
      if (_enemysGrid[nearby] == 's') {
        this.lastAttackedShip = nearby
        this.nearbyArea = [1, -1, 10, -10]
      }
    }
    return nearby
  }
  CheckSunkenShips(_hit) {
    console.log("Checking sunken ships")
    for (let i = 0; i < this.NumberOfShips; i++) {
      for (let j = 0; j < this.ships[i].Length; j++) {
        if (this.ships[i].positions[j] == _hit) {
          console.log("Hited ships")
          if (this.ships[i].hit == this.ships[i].Length) {
            console.log(this.name + "'s " + this.ships[i].name + " sunken, ship id: " + this.ships[i].id)
            this.ships[i].sunken = true
            this.sunkenShips++
            //console.log(this.ships[i])
          }
        }
      }
    }
  }
  BorderAttackCheck(_posToAtt) {
    //BORDER RIGHT
    if (this.lastAttackedShip % 10 == 9 && _posToAtt % 10 == 0) {
      console.log("border right, it's bad to attack: " + _posToAtt + " when u are at: " + this.lastAttackedShip)
      return true
    }
    //BORDER LEFT
    if (this.lastAttackedShip % 10 == 0 && _posToAtt % 10 == 9) {
      console.log("border left, it's bad to attack: " + _posToAtt + " when u are at: " + this.lastAttackedShip)
      return true
    }
    console.log("No problem at: " + _posToAtt)
    return false
  }
  HittedShipsNearby(_enemysGrid, _pos) {
    let check = [-1, 1, 10, -10]
    for (let i = 0; i < check.length; i++) {
      let posToControl = _pos + check[i]
      if (posToControl > -1 && posToControl < 100 && _enemysGrid[posToControl] == 'h')
        return true
    }
    return false
  }
  DoNotHitHere(_pos, _toCheck, _enemysGrid) {
    if (!_toCheck) {
      let corner = [-11, -9, 9, 11]
      //remove uneccessary controlls
      //LEFT
      if (_pos % 10 == 0) {
        for (let i = 0; i < corner.length; i++) {
          if (corner[i] == -11 || corner[i] == 9) {
            corner.splice(i, 1)
            console.log("LEFT, Removing uneccessary controlls: " + corner[i])
          }
        }
      }
      //RIGHT
      if (_pos % 10 == 9) {
        for (let i = 0; i < corner.length; i++) {
          if (corner[i] == -9 || corner[i] == 11) {
            corner.splice(i, 1)
            console.log("RIGHT, Removing uneccessary controlls: " + corner[i])
          }
        }
      }
      //TOP
      if (_pos < 10) {
        for (let i = 0; i < corner.length; i++) {
          if (corner[i] == -11 || corner[i] == -9) {
            corner.splice(i, 1)
            console.log("TOP, Removing uneccessary controlls: " + corner[i])
          }
        }
      }
      //BOTTOM
      if (_pos > 89) {
        for (let i = 0; i < corner.length; i++) {
          if (corner[i] == 9 || corner[i] == 11) {
            corner.splice(i, 1)
            console.log("BOTTOM, Removing uneccessary controlls: " + corner[i])
          }
        }
      }
      for (let i = 0; i < corner.length; i++) {
        let cornerPos = corner[i] + _pos
        if (cornerPos > -1 && cornerPos < 100) {
          if (_enemysGrid[cornerPos] != 'm' || _enemysGrid[cornerPos] != 'h') {
            let alreadyPresent = this.positionsNotToHit.find(element => element == cornerPos);
            if (alreadyPresent == undefined) {
              this.positionsNotToHit.push(cornerPos)
              console.log("This position doesn't need to be hitted: " + cornerPos)
            }
            else {
              console.log("There is already the value: " + alreadyPresent)
            }
          }
        }
      }
    }
    else {
      for (let i = 0; i < this.positionsNotToHit.length; i++) {
        if (_pos == this.positionsNotToHit[i]) {
          console.log("This position is uneccessary to hit: " + _pos)
          return true
        }
      }
      console.log("There is no problem bro u can hit here: " + _pos)
      return false
    }
  }
}