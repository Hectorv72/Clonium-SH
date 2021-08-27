// eslint-disable-next-line import/no-absolute-path
import { filas, columnas } from '/javascript/clone.js';
// eslint-disable-next-line import/no-absolute-path
import { cargarLista, h1Msj } from '/javascript/table.js';

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
    setTimeout(() => { verifExpansion(array, filas, columnas); }, 500);
  } else {
    globalAwait = false;
    // h1Msj.innerHTML = '';
    // globalAwait = false;
  }
}

//

// -------------------------------------------------------------------

//

// Agrega un punto a las fichas de alrededores
function expandir (array, posrow, poscol, cols, rows) {
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
  cargarLista(array);
}

// -------------------------------------------------------------------------

function addDot (array, posrow, poscol) {
  globalAwait = true;
  array[posrow][poscol].value += 1;
  const ficha = array[posrow][poscol].value;

  h1Msj.innerHTML = 'Await...';

  if (ficha >= 4) {
    setTimeout(() => { verifExpansion(array, filas, columnas); }, 300);
  } else {
    globalAwait = false;
    // h1Msj.innerHTML = '';
  }
  cargarLista(array);
};

// ------------------------------------------------------------------------------

export { addDot, globalAwait };
