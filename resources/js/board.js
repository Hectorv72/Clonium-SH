/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
// eslint-disable-next-line import/no-absolute-path
import { renderList } from '/javascript/table.js';

// --------------------------------------------------
// http://192.168.80.246:5000/
let arrayGame = [];
let gameRows  = 8;
let gameCols  = 8;
let countPlayers;
const listPlayers = [{ id: 1, color: 'red', name: 'Hector', chips: 1, dots: 3 }, { id: 2, color: 'blue', name: 'Juan', chips: 1, dots: 3 }];

const startGame = async () => {

  const response = await fetch('/clonium/board', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      players: listPlayers,
      rows: gameRows,
      cols: gameCols
    })
  });

  const json = await response.json();

  arrayGame    = json.board;
  gameRows     = json.rows;
  gameCols     = json.cols;
  countPlayers = json.players;

  renderList(arrayGame);
};

startGame();

export { gameRows, gameCols, countPlayers, listPlayers };
