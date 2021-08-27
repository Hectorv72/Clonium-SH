import { setGlobalAwait, cargarLista } from '/javascript/clone.js';

// -------------------------------------------------------------

// Verifica la posicion de las fichas que tienen mas de 3 y los expande (se retroalimenta)
function verifExpansion (array, filas, columnas) {
  const list = [];

  // Recorre el array en busca de fichas con mas de 3
  // Y las guarda en una nueva lista
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (array[i][j].value >= 4) {
        list.push([i, j]);
      }
    }
  }

  // Si la lista es mayor de 0 elementos entonces los expande y luego vuelve a verificar
  if (list.length > 0) {
    // globalAwait = true;
    setGlobalAwait(true);
    // console.log(list);
    list.forEach(element => expandir(array, element[0], element[1], filas, columnas));
    setTimeout(() => { verifExpansion(array); }, 1000);
  } else {
    setGlobalAwait(false);
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
  // const player = array[posrow][poscol].player;

  if (ficha >= 4) {
    if (posrow > 0) { // Agrega una ficha arriba
      array[posrow - 1][poscol].value += 1;
      array[posrow - 1][poscol].color = color;
    }

    if (posrow < rows - 1) { // Agrega una ficha abajo
      array[posrow + 1][poscol].value += 1;
      array[posrow + 1][poscol].color = color;
    }

    if (poscol > 0) { // Agrega una ficha a la izq
      array[posrow][poscol - 1].value += 1;
      array[posrow][poscol - 1].color = color;
    }

    if (poscol < cols - 1) { // Agrega una ficha a la der
      array[posrow][poscol + 1].value += 1;
      array[posrow][poscol + 1].color = color;
    }

    // si la ficha tiene 5 por el culo te la hinco, y agrega uno al medio
    if (ficha === 5) {
      array[posrow][poscol].value = 1;
    } else {
      array[posrow][poscol].value = 0;
      array[posrow][poscol].color = '';
    }
  }

  // actualiza la tabla html de fichas (board)
  cargarLista(array);
}

export { verifExpansion, expandir };
