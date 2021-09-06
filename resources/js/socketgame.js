/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
/* eslint-disable import/no-absolute-path */
import { sendAddDotPosition, globalAwait, setAwait } from '/javascript/socket.js';

const tblClonium = document.getElementById('tabla');
// const divPoints  = document.getElementById('puntos');

let globalTurn  = 1;

function updateTurn (turn) {
  globalTurn = turn;
}

// Renderiza en bruto la tabla con los datos de una lista
async function renderList (array) {

  let newBoard = '';

  array.forEach(row => {

    newBoard += '<tr>';
    row.forEach(column => {
      if (column.value === 0) {
        newBoard += `<td id="td-${column.id}" ></td>`;
      } else {
        newBoard += `<td id="td-${column.id}" ><div class="ficha dot dot-${column.value}" style="background-color: ${column.color};" ></div></td>`;
      }
    });
    newBoard += '</tr>';
  });

  tblClonium.innerHTML = newBoard;
  // console.log(array);

  playerMarker(array, globalTurn);
  // llama a la funcion que crea sus eventos click
  cellsAddDotEvent(tblClonium, array);

}

// -------------------------------------------------------------

function eventAddDot (chip) {
  const player = chip.player;

  if (chip.value >= 1) {
    if (globalTurn === player) {
      if (globalAwait === false) {
        sendAddDotPosition(chip.row, chip.col);
      }
    }
  }
}

// Agrega el evento de agregar punto a las celdas con fichas
function cellsAddDotEvent (table, array) {

  array.forEach(row => row.forEach(col => {
    const td = document.querySelector(`#${table.id} > tbody > tr > td[id='td-${col.id}'] `);

    if (col.value >= 1) {
      td.onclick = () => { eventAddDot(col); };

    } else {
      td.onclick = '';
    }

  }));

}

// ------------------------------------------------------------------------------

// function renderTotalPlayerDots (list) {
//   let totalDotsHtml = '';
//   list.forEach(element => { totalDotsHtml += `<div class="ficha" style="background-color: ${element.color}"><strong style="color:white">${element.dots}</strong></div>`; });
//   divPoints.innerHTML = totalDotsHtml;
// }

// Proceso de renderizado por tiempo
function renderProcess (master, array) {

  if (array.length > 0) {

    updateRenderList(array[0]);
    const newarray = JSON.parse(JSON.stringify(array.slice(1, array.length)));
    setTimeout(() => { renderProcess(master, newarray); }, 500);
  } else {

    // nextTurn(master);
    playerMarker(master, globalTurn);
    setAwait(false);
    cellsAddDotEvent(tblClonium, master);
  }

}

// Renderiza un sector de la tabla con el color de fondo
function updateRenderList (array) {

  array.forEach((row) => {
    if (row.length > 0) {
      row.forEach((col) => {

        const tdclon = document.querySelector(`#${tblClonium.id} > tbody > tr > td[id='td-${col.id}'] `);

        if (col.value !== 0) {
          tdclon.style = 'background-color: rgb(128, 43, 155)';
          tdclon.innerHTML = `<div class="ficha dot dot-${col.value}" style="background-color: ${col.color};"></div>`;
        } else {
          tdclon.innerHTML = '';
          tdclon.style = '';
        }

      });
    }
  });

}

// function getPlayerChips (array, player) {

//   const newvector = [];
//   array.forEach(element => element.forEach(value => {
//     if (value.player === player) {
//       newvector.push(value);
//     }
//   }));

//   console.log(newvector);
//   return newvector;
// }

function playerMarker (array, player) {

  array.forEach(row => row.forEach(col => {
    if (col.player === player) {
      document.getElementById(`td-${col.id}`).style = 'background-color: yellow;';
    } else {
      document.getElementById(`td-${col.id}`).style = '';
    }
  }));
}

export { renderList, globalTurn, updateTurn, renderProcess };
