import {
    Player
}
from "./GameComponents.js";
export function Game() {
    const giocatore = new Player("Giocatore");
    const bot = new Player("BOT");
    // create 10 ships for each player
    for(let i = 0; i < 10; i++) {
        let shipName = "";
        let size = 0;
        if(i == 0) {
            shipName = "Aircraft Carrier";
            size = 5;
        }
        if(i == 1) {
            shipName = "Battleship";
            size = 4;
        }
        if(i == 2) {
            shipName = "Submarine";
            size = 3;
        }
        if(i > 2 && i < 6) {
            shipName = "Cruiser";
            size = 2;
        }
        if(i > 5 && i < 10) {
            shipName = "Destroyer";
            size = 1;
        }
        giocatore.newShip(i, shipName, size);
        bot.newShip(i, shipName, size);
    }
    console.log(giocatore);
    console.log(bot);
}

/*export function makeGrid() {
  var grid = document.getElementById("grid");
  console.log(grid);
  var table = document.createElement("table");
  console.log(table);
  for (let i = 0; i < 11; i++) {
    const thr = document.createElement("td");
    thr.classList.add("square");
    thr.textContent = i;
    table.appendChild(thr);
  }
  grid.appendChild(table);
}
*/
