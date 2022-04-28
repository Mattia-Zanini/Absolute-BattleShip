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
  positionToHit;
  positionHitted;
  positionShipHitted;
  positionsNotToHit;
  nextsAttack;
  randomAttacks;
  constructor(_name) {
    this.name = _name;
    this.sunkenShips = 0;
    this.randomAttacks = true;
    this.positionToHit = [];
    for (let i = 0; i < 100; i++) {
      this.positionToHit.push(i);
    }
    this.positionShipHitted = [];
    this.positionHitted = [];
    this.positionsNotToHit = [];
    this.nextsAttack = [];
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
    this.randomAttacks = true;
    this.positionToHit = [];
    for (let i = 0; i < 100; i++) {
      this.positionToHit.push(i);
    }
    this.positionShipHitted = [];
    this.positionHitted = [];
    this.positionsNotToHit = [];
    this.nextsAttack = [];
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
  Attack(_enemysGrid) {
    if (this.lastAttack == undefined)
      console.log("Last attack not registered yet")
    else {
      console.log("Last attack already registered with value: " + this.lastAttack)
      console.log("Enemy grid in pos last attack is: " + _enemysGrid[this.lastAttack])
    }
    if (this.randomAttacks) {
      return this.RandomAttack(_enemysGrid);
    }
    else {
      return this.SmartAttack(_enemysGrid);
    }
  }
  RandomAttack(_enemysGrid) {
    console.log("Random Attack")
    let randAttck
    let randIndex = Math.floor(Math.random() * this.positionToHit.length)
    randAttck = this.positionToHit[randIndex]
    this.positionToHit.splice(randIndex, 1)
    console.log("Removed: " + randAttck + " from position to hit")
    this.positionHitted.push(randAttck)
    console.log("Added: " + this.positionHitted[this.positionHitted.length - 1] + " to position hitted")
    console.log("Attacking position: " + randAttck)
    console.log("Enemy's grid value: " + _enemysGrid[randAttck])
    console.log("Saving latest attack")
    this.lastAttack = randAttck
    console.log(this.positionToHit)
    if (_enemysGrid[randAttck] == 's') {
      console.log("RANDOM Bot have hitted a player's ship at: " + randAttck)
      this.positionShipHitted.push(randAttck)
      this.randomAttacks = false

      let corner = [-11, -9, 9, 11]
      this.RemoveUnecessaryControlls(corner, randAttck)
      for (let i = 0; i < this.positionToHit.length; i++) {
        for (let j = 0; j < corner.length; j++) {
          let checkPosToRemove = randAttck + corner[j]
          if (this.positionToHit[i] == checkPosToRemove) {
            let removedCorner = this.positionToHit.splice(i, 1)
            console.log("Removed: " + removedCorner + " from position to hit")
            this.positionsNotToHit.push(removedCorner)
          }
        }
      }
      console.log(this.positionToHit)
    }
    return randAttck
  }
  SmartAttack(_enemysGrid) {
    console.log("Smart Attack")
    let nearbyArea = [-10, -1, 1, 10]
    let smartAttck; let isValid = false
    let latestShipHitted = parseInt(this.positionShipHitted.slice(-1))  //.slice(-1) return the last element of the array
    console.log("1")
    this.RemoveUnecessaryControlls(nearbyArea, latestShipHitted)
    console.log("2")
    if (nearbyArea.length > 0) {
      let randPos
      do {
        randPos = Math.floor(Math.random() * nearbyArea.length)
        console.log("Random smart near position: " + nearbyArea[randPos])
        //check if there is the position
        for (let i = 0; i < this.positionToHit.length; i++) {
          if (this.positionToHit[i] == latestShipHitted + nearbyArea[randPos]) {
            smartAttck = this.positionToHit[i]
            console.log("Position that there is maybe a ship: " + smartAttck)
            this.positionToHit.splice(i, 1)
            isValid = true
            break
          }
        }
        nearbyArea.splice(randPos, 1)

        if (nearbyArea.length == 0) {
          console.log("No more positions in the nearby to check")
          break
        }
      } while (!isValid)
    }
    console.log("3")
    if (nearbyArea.length == 0 && !isValid) {
      console.log("No nearby area to attack")
      smartAttck = this.RandomAttack(_enemysGrid)
      this.randomAttacks = true
    }
    console.log("4")
    if (_enemysGrid[smartAttck] == 's') {
      console.log("SMART Bot have hitted a player's ship at: " + smartAttck)
      this.positionShipHitted.push(smartAttck)

      let corner = [-11, -9, 9, 11]
      this.RemoveUnecessaryControlls(corner, smartAttck)
      for (let i = 0; i < this.positionToHit.length; i++) {
        for (let j = 0; j < corner.length; j++) {
          let checkPosToRemove = smartAttck + corner[j]
          if (this.positionToHit[i] == checkPosToRemove) {
            let removedCorner = this.positionToHit.splice(i, 1)
            console.log("Removed: " + removedCorner + " from position to hit")
            this.positionsNotToHit.push(removedCorner)
          }
        }
      }
      console.log(this.positionToHit)
    }
    this.lastAttack = smartAttck
    return smartAttck
  }
  RemoveUnecessaryControlls(array, _pos) {
    console.log("Removing unnecessary controls")
    for (let i = 0; i < array.length; i++) {
      let checkingPos = _pos + array[i]
      console.log("Checking position: " + checkingPos + " with this array value: " + array[i])
      //top & bottom
      if (checkingPos < 0 || checkingPos > 99) {
        array.splice(i, 1)
        i--
      }
      //left
      else if (_pos % 10 == 0 && checkingPos % 10 == 9) {
        array.splice(i, 1)
        i--
      }
      //right
      else if (_pos % 10 == 9 && checkingPos % 10 == 0) {
        array.splice(i, 1)
        i--
      }
    }
    console.log("Finished to remove the useless controlls")
    console.log(array)
  }
}