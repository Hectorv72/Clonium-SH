/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
// eslint-disable-next-line import/no-absolute-path
import { renderList, updateTurn } from '/javascript/socketgame.js';
// eslint-disable-next-line import/no-absolute-path
import { joinRoom } from '/javascript/socket.js';

// --------------------------------------------------
// http://192.168.80.246:5000/
let arrayGame = [];
let gameRows  = 8;
let gameCols  = 8;
let roomKey   = '';
let countPlayers;
const path = location.pathname.split('/');
const room = path[path.length - 1];

const listPlayers = [{ id: 1, color: 'red', name: 'Hector' }, { id: 2, color: 'blue', name: 'Juan' }];

const updateBoard = (data) => {
  arrayGame = data;
};

const setBoard = (data) => {

  updateBoard(data);
  renderList(arrayGame);
  return arrayGame;
};

const startGame = async () => {

  const response = await fetch(`/clonium/${room}/board`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      players: listPlayers,
      rows: gameRows,
      cols: gameCols
    })
  });

  const json = await response.json();

  updateTurn(json.turn);
  setBoard(json.board);
  gameRows     = json.rows;
  gameCols     = json.cols;
  countPlayers = json.players;
  roomKey      = json.room;
  joinRoom(json.room);
};

startGame();

export { arrayGame, roomKey, setBoard, updateBoard,  gameRows, gameCols, countPlayers, listPlayers };
