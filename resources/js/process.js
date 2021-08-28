// eslint-disable-next-line import/no-absolute-path
import { filas, columnas, listPlayers } from '/javascript/clone.js';
// eslint-disable-next-line import/no-absolute-path
import { cargarLista, nextTurn, globalTurno } from '/javascript/table.js';

// -------------------------------------------------------------

let globalAwait = false;

// Verifica la posicion de las fichas que tienen mas de 3 y los expande (se retroalimenta)
function verifExpansion (array, rows, cols) {
  const list = [];

  // Recorre el array en busca de fichas con mas de 3
  // Y las guarda en una nueva lista
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (array[i][j].value >= 4) {
        list.push([i, j]);
      }
    }
  }

  // Si la lista es mayor de 0 elementos entonces los expande y luego vuelve a verificar
  if (list.length > 0) {
    globalAwait = true;
    list.forEach(element => expandir(array, element[0], element[1], rows, cols));
    puntosPlayer(array);
    setTimeout(() => { verifExpansion(array, filas, columnas); }, 500);
  } else {
    globalAwait = false;
    nextTurn();
    // playerMarker(array);
    // h1Msj.innerHTML = '';
    // globalAwait = false;
  }
  cargarLista(array);
}

//

// -------------------------------------------------------------------

//

// Agrega un punto a las fichas de alrededores
function expandir (array, posrow, poscol, rows, cols) {
  const ficha = array[posrow][poscol].value;
  const color = array[posrow][poscol].color;
  const player = array[posrow][poscol].player;
  // const player = array[posrow][poscol].player;

  if (ficha >= 4) {
    if (posrow > 0) { // Agrega una ficha arriba
      array[posrow - 1][poscol].value += 1;
      array[posrow - 1][poscol].color = color;
      array[posrow - 1][poscol].player = player;
    }

    if (posrow < rows - 1) { // Agrega una ficha abajo
      array[posrow + 1][poscol].value += 1;
      array[posrow + 1][poscol].color = color;
      array[posrow + 1][poscol].player = player;
    }

    if (poscol > 0) { // Agrega una ficha a la izq
      array[posrow][poscol - 1].value += 1;
      array[posrow][poscol - 1].color = color;
      array[posrow][poscol - 1].player = player;
    }

    if (poscol < cols - 1) { // Agrega una ficha a la der
      array[posrow][poscol + 1].value += 1;
      array[posrow][poscol + 1].color = color;
      array[posrow][poscol + 1].player = player;
    }

    // si la ficha tiene 5 por el culo te la hinco, y agrega uno al medio
    if (ficha === 5) {
      array[posrow][poscol].value = 1;
    } else {
      array[posrow][poscol].value = 0;
      array[posrow][poscol].color = '';
      array[posrow][poscol].player = null;
    }
  }

  // actualiza la tabla html de fichas (board)
  // cargarLista(array);
}

// -------------------------------------------------------------------------

function addDot (array, posrow, poscol) {
  globalAwait = true;
  array[posrow][poscol].value += 1;
  const ficha = array[posrow][poscol].value;

  // h1Msj.innerHTML = 'Await...';

  if (ficha >= 4) {
    setTimeout(() => { verifExpansion(array, filas, columnas); }, 300);
  } else {
    globalAwait = false;
    puntosPlayer(array);
    nextTurn();
    cargarLista(array);
    // h1Msj.innerHTML = '';
  }
};

// ------------------------------------------------------------------------------

function fichasPlayer (array, player) {
  const newvector = [];
  array.forEach(element => element.forEach(value => { if (value.player === player) { newvector.push(value); } }));

  // const probando = array.filter(element => (element.filter(value => value.player === globalTurno).length !== 0)).map(element => element.filter(value => value.value !== 0));
  //
  return newvector;
}

function puntosPlayer (array) {
  // console.log(array);
  listPlayers.forEach(player => {
    let puntos = 0;
    fichasPlayer(array, player.id).forEach(element => { puntos += element.value; });

    listPlayers[player.id - 1].puntos = puntos;
  });

  // console.log(fichas);
}

// ----------------------------------------------------------------

export { addDot, globalAwait, fichasPlayer };
