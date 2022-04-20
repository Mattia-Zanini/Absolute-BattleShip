import { Player } from "./GameComponents.js";
export const giocatore = new Player("Giocatore");
export const bot = new Player("BOT");
export function StartGame() {
  // create 10 ships for each player
  for (let i = 0; i < 10; i++) {
    let shipName = "";
    let size = 0;
    if (i == 0) {
      shipName = "Carrier";
      size = 5;
    }
    if (i == 1) {
      shipName = "Battleship";
      size = 4;
    }
    if (i == 2) {
      shipName = "Submarine";
      size = 3;
    }
    if (i > 2 && i < 6) {
      shipName = "Cruiser";
      size = 2;
    }
    if (i > 5 && i < 10) {
      shipName = "Destroyer";
      size = 1;
    }
    giocatore.NewShip(i, shipName, size);
    bot.NewShip(i, shipName, size);
  }
  console.log(giocatore);
  console.log(bot);
}
export function AdjustCellValue(_row, _col) {
  _row = _row - 2
  _col = _col - 2
  let pos = ((_row * 10) + _col)
  return pos
}