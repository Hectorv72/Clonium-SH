// eslint-disable-next-line import/no-absolute-path
import { addDot, globalAwait } from '/javascript/process.js';
// eslint-disable-next-line import/no-absolute-path
import { jugadores } from '/javascript/clone.js';

const tblClonium = document.getElementById('tabla');
// eslint-disable-next-line no-multi-spaces
const h1Msj      = document.getElementById('mensaje');

let globalTurno = 1;

// Renderiza la tabla con los nuevos datos
function cargarLista (array) {
  let newBoard = '';

  array.forEach(row => {
    newBoard += '<tr>';
    row.forEach(column => {
      const valor = column.value;
      if (column.value === 0) {
        newBoard += '<td></td>';
      } else {
        newBoard += `<td><div class="ficha" style="background-color: ${column.color};" >${valor}</div></td>`;
      }
    });
    newBoard += '</tr>';
  });
  tblClonium.innerHTML = newBoard;

  // llama a la funcion que crea sus eventos click
  cellsEvents(tblClonium, array);
  console.log(globalTurno);
  h1Msj.innerHTML = 'Turno del jugador ' + globalTurno;
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
              globalTurno += 1;

              if (globalTurno > jugadores) {
                globalTurno = globalTurno % jugadores;
              }
              addDot(array, i, j);
            }
          }
        }
      });
    }
  }
}

export { cargarLista, h1Msj };
