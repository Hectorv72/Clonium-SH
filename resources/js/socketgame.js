/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
/* eslint-disable import/no-absolute-path */
import { sendAddDotPosition, globalAwait } from '/javascript/socket.js';
// import { globalAwait, getPlayerChips }         from '/javascript/chips.js'; // addDot
import { countPlayers } from '/javascript/board.js'; // listPlayers

const tblClonium = document.getElementById('tabla');
// const divPoints  = document.getElementById('puntos');

let globalTurn  = 1;

function updateTurn (turn) {
  globalTurn = turn;
}
// let clickCount  = 0;

// function resetClickCount () {
//   clickCount = 0;
// }

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
  //   renderTotalPlayerDots(listPlayers);

  // llama a la funcion que crea sus eventos click
  cellsAddDotEvent(tblClonium, array);
}

// -------------------------------------------------------------

// function addDotEvent (chip) {
//   const player = chip.player;

//   if (chip.value >= 1) {
//     if (globalAwait === false) {
//       if (globalTurn === player) {
//         console.log('aca no');
//         sendAddDotPosition(chip.col, chip.row);
//       }
//     }
//   }
// }

function eventAddDot (chip) {
  const player = chip.player;

  if (chip.value >= 1) {
    if (globalTurn === player) {
      if (globalAwait === false) {
        // console.log(chip.value);
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

      // td.addEventListener('click', () => {
      //   console.log(td.events);
      //   // addDotEvent(col);
      //   console.log(row);
      //   console.log(col);
      //   console.log('----------------------');
      //   eventAddDot(col);
      // }, false);

    } else {
      td.onclick = '';
    }

  }));

}

// --------------------------------------------------------------------

// --------------------------------------------------------------

function nextTurn (array) {
  globalTurn += 1;

  // console.log(globalTurn);
  if (globalTurn > countPlayers) {
    globalTurn = globalTurn % countPlayers;
  }
  // console.log(globalTurn);

  playerMarker(array, globalTurn);

}

// ------------------------------------------------------------------------------

// function renderTotalPlayerDots (list) {
//   let totalDotsHtml = '';
//   list.forEach(element => { totalDotsHtml += `<div class="ficha" style="background-color: ${element.color}"><strong style="color:white">${element.dots}</strong></div>`; });
//   divPoints.innerHTML = totalDotsHtml;
// }

function renderProcess (master, array) {

  if (array.length > 0) {

    updateRenderList(array[0]);
    const newarray = JSON.parse(JSON.stringify(array.slice(1, array.length)));
    setTimeout(() => { renderProcess(master, newarray); }, 500);
  } else {

    // nextTurn(master);
    playerMarker(master, globalTurn);
    cellsAddDotEvent(tblClonium, master);
  }

}

function updateRenderList (array) {

  array.forEach((row) => {
    if (row.length > 0) {
      row.forEach((col) => {

        const tdclon = document.querySelector(`#${tblClonium.id} > tbody > tr > td[id='td-${col.id}'] `);

        if (col.value !== 0) {
          tdclon.style = 'background-color: rgb(128, 43, 155)';
          tdclon.innerHTML = `<div class="ficha" style="background-color: ${col.color};">${col.value}</div>`;
        } else {
          tdclon.innerHTML = '';
          tdclon.style = '';
        }

      });
    }
  });
  // renderList(master);
  // console.log(array);
  // playerMarker(array, globalTurn);
  // renderTotalPlayerDots(listPlayers);
}

//

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
  // if (arrayPlayerChips.length > 0) {

  //   listPlayers[globalTurn - 1].chips = arrayPlayerChips.length;
  //   arrayPlayerChips.forEach(element => {  });
  // }
  //  else {
  //   nextTurn();
  //   playerMarker(arrayPlayerChips);
  // }
}

// function playerMarker (array, player) {
//   const arrayPlayerChips = getPlayerChips(array, player);
//   console.log(arrayPlayerChips.length);
//   if (arrayPlayerChips.length > 0) {

//     listPlayers[globalTurn - 1].chips = arrayPlayerChips.length;
//     arrayPlayerChips.forEach(element => { document.getElementById(`td-${element.id}`).style = 'background-color: yellow;'; });
//   }
//   //  else {
//   //   nextTurn();
//   //   playerMarker(arrayPlayerChips);
//   // }
// }

export { renderList, nextTurn, globalTurn, updateTurn, renderProcess }; // playerMarker
