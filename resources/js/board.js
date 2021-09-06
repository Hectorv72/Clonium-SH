/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
// eslint-disable-next-line import/no-absolute-path
import { renderList, updateTurn } from '/javascript/socketgame.js';
// eslint-disable-next-line import/no-absolute-path
import { joinRoom } from '/javascript/socket.js';

const divRoot = document.getElementById('root');
// --------------------------------------------------
// http://192.168.80.246:5000/
let arrayGame = [];
let gameRows  = 9;
let gameCols  = 9;
let roomKey   = '';
let countPlayers;
const path = location.pathname.split('/');
const room = path[path.length - 1];

const listPlayers = [{ id: 1, color: 'red', name: 'Hector' }, { id: 2, color: 'blue', name: 'Juan' }];
// , { id: 2, color: 'blue', name: 'Juan' }, { id: 1, color: 'red', name: 'Hector' }, { id: 2, color: 'blue', name: 'Juan' }, { id: 2, color: 'blue', name: 'Juan' }

const updateBoard = (data) => {
  arrayGame = data;
};

const setBoard = (data) => {

  updateBoard(data);
  renderList(data);
  return arrayGame;
};

const startGame = (game) => {
  updateTurn(game.turn);
  setBoard(game.board);
  gameRows     = game.rows;
  gameCols     = game.cols;
  countPlayers = game.players;
  roomKey      = game.room;
  joinRoom(game.room);
};

const createGame = async () => {
  countPlayers = document.getElementById('select-players').value;
  gameRows     = document.getElementById('select-rows').value;
  gameCols     = document.getElementById('select-cols').value;
  // console.log(countPlayers);

  const response = await fetch(`/clonium/${room}/board`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      players: countPlayers,
      rows: gameRows,
      cols: gameCols
    })
  });
  const json = await response.json();
  divRoot.innerHTML = '';

  startGame(json);

};

const getGame = async () => {
  const response = await fetch(`/clonium/${room}/board`);
  const json     = await response.json();
  // console.log(json);
  if (json.exists === true) {
    startGame(json.game);
  } else {
    divRoot.innerHTML = `
      <button id="button-create" >Crear sala</button><br>
      <label>Players: </label><select id='select-players'></select><br>
      <label>Filas: </label><select id='select-rows'></select><br>
      <label>Columnas: </label><select id='select-cols'></select>

    `;
    const button = document.getElementById('button-create');
    button.addEventListener('click', () => { createGame(); });
    const selectPlayers = document.getElementById('select-players');
    const selectRows    = document.getElementById('select-rows');
    const selectCols    = document.getElementById('select-cols');

    [2, 3, 4, 5, 6].forEach((element) => {
      selectPlayers.innerHTML += `<option value=${element}>${element}</option>`;
    });

    [8, 9, 10, 11, 12, 13].forEach((element) => {
      selectRows.innerHTML += `<option value=${element}>${element}</option>`;
    });

    [8, 9, 10, 11, 12, 13].forEach((element) => {
      selectCols.innerHTML += `<option value=${element}>${element}</option>`;
    });
  }
};

// startGame();
getGame();

export { arrayGame, roomKey, setBoard, updateBoard,  gameRows, gameCols, countPlayers, listPlayers };
