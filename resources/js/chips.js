/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */

// eslint-disable-next-line import/no-absolute-path
import { gameRows, gameCols, listPlayers } from '/javascript/board.js';
// eslint-disable-next-line import/no-absolute-path
import { renderList, nextTurn } from '/javascript/table.js';

// -------------------------------------------------------------

let globalAwait = false;

// Verifica la posicion de las chips que tienen mas de 3 y los expandChipe (se retroalimenta)
function checkChipExpansion (array, rows, cols) {

  const list = [];

  // Recorre el array en busca de chips con mas de 3
  // Y las guarda en una nueva lista
  for (let i = 0; i < rows; i++) {

    for (let j = 0; j < cols; j++) {

      if (array[i][j].value >= 4) {

        list.push([i, j]);

      }
    }
  }

  // Si la lista es mayor de 0 elementos entonces los expandChipe y luego vuelve a verificar
  if (list.length > 0) {

    globalAwait = true;
    list.forEach(element => expandChip(array, element[0], element[1], rows, cols));
    updatePlayerTotalDots(array);
    setTimeout(() => { checkChipExpansion(array, gameRows, gameCols); }, 500);

  } else {
    globalAwait = false;
    nextTurn();
  }

  renderList(array);
}

// -------------------------------------------------------------------

// Agrega un punto a las fichas de alrededores
function expandChip (array, posrow, poscol, rows, cols) {

  const chip   = array[posrow][poscol];
  const color  = array[posrow][poscol].color;
  const player = array[posrow][poscol].player;

  if (chip.value >= 4) {

    if (posrow > 0) { // Agrega un punto/ficha arriba
      array[posrow - 1][poscol].value += 1;
      array[posrow - 1][poscol].color  = color;
      array[posrow - 1][poscol].player = player;
    }

    if (posrow < rows - 1) { // Agrega un punto/ficha abajo
      array[posrow + 1][poscol].value += 1;
      array[posrow + 1][poscol].color  = color;
      array[posrow + 1][poscol].player = player;
    }

    if (poscol > 0) { // Agrega un punto/ficha a la izquierda
      array[posrow][poscol - 1].value += 1;
      array[posrow][poscol - 1].color  = color;
      array[posrow][poscol - 1].player = player;
    }

    if (poscol < cols - 1) { // Agrega un punto/ficha a la derecha
      array[posrow][poscol + 1].value += 1;
      array[posrow][poscol + 1].color  = color;
      array[posrow][poscol + 1].player = player;
    }

    // si la chip tiene 5 por el culo te la hinco, y agrega uno al medio
    if (chip.value === 5) {
      array[posrow][poscol].value = 1;
    } else {
      array[posrow][poscol].value  = 0;
      array[posrow][poscol].color  = '';
      array[posrow][poscol].player = null;
    }
  }
}

// -------------------------------------------------------------------------

function addDot (array, posrow, poscol) {
  //
  globalAwait = true;
  array[posrow][poscol].value += 1;
  const chip = array[posrow][poscol];

  if (chip.value >= 4) {
    setTimeout(() => { checkChipExpansion(array, gameRows, gameCols); }, 300);
  } else {
    globalAwait = false;
    updatePlayerTotalDots(array);
    nextTurn();
    renderList(array);
  }
};

// ------------------------------------------------------------------------------

function getPlayerChips (array, player) {

  const newvector = [];
  array.forEach(element => element.forEach(value => {
    if (value.player === player) {
      newvector.push(value);
    }
  }));

  return newvector;
}

function updatePlayerTotalDots (array) {

  listPlayers.forEach(player => {
    let totalDots = 0;
    getPlayerChips(array, player.id).forEach(element => { totalDots += element.value; });

    listPlayers[player.id - 1].dots = totalDots;
    // if(player.points){

    // }
  });
}

// ----------------------------------------------------------------

export { addDot, globalAwait, getPlayerChips };
