// eslint-disable-next-line import/no-absolute-path
import { cargarLista } from '/javascript/table.js';

// --------------------------------------------------

let arrayGame = [];
let filas;
let columnas;
let jugadores;

const game = async () => {
  const response = await fetch('/board');
  const json = await response.json();
  console.log(json);
  arrayGame = json.board;
  filas = json.rows;
  columnas = json.cols;
  jugadores = json.jugadores;
  console.log(json.jugadores);

  cargarLista(arrayGame);
};

export { cargarLista, arrayGame, filas, columnas, jugadores };

game();
