// eslint-disable-next-line import/no-absolute-path
import { cargarLista } from '/javascript/table.js';

// --------------------------------------------------
// http://192.168.80.246:5000/
let arrayGame = [];
let filas = 8;
let columnas = 8;
let jugadores;
const listPlayers = [{ id: 1, color: 'red', nombre: 'Hector', fichas: 1, puntos: 3 }, { id: 2, color: 'blue', nombre: 'Juan', fichas: 1, puntos: 3 }];

// const game = async () => {
//   const response = await fetch('/board');
//   const json = await response.json();
//   // console.log(json);
// };

const game = async () => {
  const response = await fetch('/board', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      players: listPlayers,
      rows: filas,
      cols: columnas
    })
  });

  const json = await response.json();

  // console.log(json.board);
  arrayGame = json.board;
  filas = json.rows;
  columnas = json.cols;
  jugadores = json.jugadores;
  // console.log(json.jugadores);

  cargarLista(arrayGame);
};

// ==>

// ==>

// const setgame = () => {

// };

export { cargarLista, arrayGame, filas, columnas, jugadores, listPlayers };

game();
