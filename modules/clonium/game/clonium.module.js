/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */


const { updateBoard, getBoard, createBoard } = require('./board.module');
const { chipSelect } = require('../process/gameprocess.module');

// -------------------------------------------------------------------

function getOrCreateGameBoard (room, datos) {
  const roomBoard = getBoard(room);
  let   gameboard;

  // console.log(datos.players);

  if (roomBoard !== undefined) {
    gameboard = roomBoard;
  } else {
    gameboard = createBoard(room, datos.rows, datos.cols, datos.players); // datos.players.length
  }

  const response  = {
    room: room,
    rows: gameboard.rows,
    cols: gameboard.cols,
    turn: gameboard.turn,
    players: gameboard.players,
    board: gameboard.board
  };

  return response;
}

// ------------------------------------------------------

function socketGameBoard (data) {

  const globalBoard = getBoard(data.room);

  const sendedBoard = data.board;

  if (globalBoard.board !== undefined) {

    if (JSON.stringify(globalBoard.board) === JSON.stringify(sendedBoard)) {

      const newBoard = chipSelect(JSON.parse(JSON.stringify(sendedBoard)), data.col, data.row);
      const processList = getProcess(newBoard.process);

      // Cambia el turno del jugador
      let turno = (globalBoard.turn + 1);
      if (turno > globalBoard.players.length) {
        turno = turno - globalBoard.players.length;
      }

      const response = { turn: turno, row: data.row, col: data.col, board: newBoard.board, process: processList }; // board: originalBoard
      updateBoard(data.room, turno, newBoard.board);
      return response;
      // => io.sockets.in(data.room).emit('add-dot-receiver', response);

    } else {

      const response = { turn: data.turn, row: data.row, col: data.col, board: data.board, process: [] };
      return response;

    }
  } else {
    const response = { turn: data.turn, row: data.row, col: data.col, board: globalBoard.board, process: [] };
    return response;

  }
}



// Devuelve un array con el proceso de expansion
function getProcess (array) {
  const processList = [];

  // console.log(array[0]);
  array.forEach((board, key) => {
    const localList = [];
    if (key > 0) {
      board.forEach((row, rkey) => {
        const tempList = [];
        row.forEach((col, ckey) => {
          const previouscol = array[key - 1][rkey][ckey];

          if (col.value !== previouscol.value || col.player !== previouscol.player) {
            // console.log(col.id + ' ' + col.value + ' ' + previouscol.value);
            tempList.push(col);
          }
        });
        localList.push(tempList);
      });
      // console.log(localList);
      processList.push(JSON.parse(JSON.stringify(localList)));
    }

  });

  return processList;

}


module.exports = { socketGameBoard, getOrCreateGameBoard };
