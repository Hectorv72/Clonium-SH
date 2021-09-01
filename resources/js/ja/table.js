/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
/* eslint-disable import/no-absolute-path */
import { sendAddDotPosition }                  from '/javascript/socket.js';
import { globalAwait, getPlayerChips }         from '/javascript/chips.js'; // addDot
import { countPlayers, listPlayers }           from '/javascript/board.js';

const tblClonium = document.getElementById('tabla');
const divPoints  = document.getElementById('puntos');

let globalTurn = 1;

// Renderiza la tabla con los nuevos datos
function renderList (array) {

  let newBoard = '';

  array.forEach(row => {

    newBoard += '<tr>';
    row.forEach(column => {
      if (column.value === 0) {
        newBoard += `<td id="td-${column.id}" ></td>`;
      } else {
        newBoard += `<td id="td-${column.id}" ><div class="ficha" style="background-color: ${column.color};" >${column.value}</div></td>`;
      }
    });
    newBoard += '</tr>';
  });

  tblClonium.innerHTML = newBoard;

  playerMarker(array, globalTurn);
  renderTotalPlayerDots(listPlayers);

  // llama a la funcion que crea sus eventos click
  cellsAddDotEvent(tblClonium, array);
}

// -------------------------------------------------------------

// Agrega el evento de agregar punto a las celdas con fichas
function cellsAddDotEvent (table, array) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].addEventListener('click', () => {
        const chip = array[i][j];
        const player = chip.player;

        if (chip.value >= 1) {
          if (globalAwait === false) {
            if (globalTurn === player) {

              // addDot(array, i, j);
              sendAddDotPosition(i, j);
            }
          }
        }
      });
    }
  }
}

// --------------------------------------------------------------------

//
function playerMarker (array, player) {
  const arrayPlayerChips = getPlayerChips(array, player);

  if (arrayPlayerChips.length > 0) {
    listPlayers[globalTurn - 1].chips = arrayPlayerChips.length;
    arrayPlayerChips.forEach(element => { document.getElementById(`td-${element.id}`).style = 'background-color: yellow;'; });
  }
  //  else {
  //   nextTurn();
  //   playerMarker(arrayPlayerChips);
  // }
}

// --------------------------------------------------------------

function nextTurn () {
  globalTurn += 1;

  if (globalTurn > countPlayers) {
    globalTurn = globalTurn % countPlayers;
  }
}

// ------------------------------------------------------------------------------

function renderTotalPlayerDots (list) {
  let totalDotsHtml = '';
  list.forEach(element => { totalDotsHtml += `<div class="ficha" style="background-color: ${element.color}"><strong style="color:white">${element.dots}</strong></div>`; });
  divPoints.innerHTML = totalDotsHtml;
}

export { renderList, playerMarker, nextTurn, globalTurn };
