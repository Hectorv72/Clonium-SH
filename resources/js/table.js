// eslint-disable-next-line import/no-absolute-path
import { addDot, globalAwait, fichasPlayer } from '/javascript/process.js';
// eslint-disable-next-line import/no-absolute-path
import { jugadores, listPlayers } from '/javascript/clone.js';

const tblClonium = document.getElementById('tabla');
// eslint-disable-next-line no-multi-spaces
// const h1Msj      = document.getElementById('mensaje');
const divPuntos = document.getElementById('puntos');

let globalTurno = 1;
// h1Msj.innerHTML = 'Turno del jugador ' + globalTurno;
// const localTurno = 0;

// Renderiza la tabla con los nuevos datos
function cargarLista (array) {
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

  // if (localTurno !== globalTurno) {
  //   localTurno = globalTurno;
  // }
  playerMarker(fichasPlayer(array, globalTurno));
  updatePoints();
  // puntosPlayer(fichasPlayer(array));

  // llama a la funcion que crea sus eventos click
  cellsEvents(tblClonium, array);
  // console.log(globalTurno);
}

// -------------------------------------------------------------

// Agrega el evento de agregar punto a los td
function cellsEvents (table, array) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].addEventListener('click', () => {
        // console.log('click' + ' ' + i + ' ' + j);
        const ficha = array[i][j].value;
        const player = array[i][j].player;

        if (globalAwait === false) {
          if (ficha >= 1) {
            if (globalTurno === player) {
              addDot(array, i, j);
            }
          }
        }
      });
    }
  }
}

// --------------------------------------------------------------------

//
function playerMarker (array) {
  if (array.length > 0) {
    listPlayers[globalTurno - 1].fichas = array.length;
    array.forEach(element => { document.getElementById(`td-${element.id}`).style = 'background-color: yellow;'; });
  } else {
    nextTurn();
    playerMarker(array);
  }
  //
}

// --------------------------------------------------------------

function nextTurn () {
  globalTurno += 1;

  if (globalTurno > jugadores) {
    globalTurno = globalTurno % jugadores;
  }
  // h1Msj.innerHTML = 'Turno del jugador ' + globalTurno;
}

// ------------------------------------------------------------------------------

function updatePoints () {
  let pointsHtml = '';
  listPlayers.forEach(element => { pointsHtml += `<div class="ficha" style="background-color: ${element.color}"><strong style="color:white">${element.puntos}</strong></div>`; });
  divPuntos.innerHTML = pointsHtml;
}

export { cargarLista, playerMarker, nextTurn, globalTurno };
