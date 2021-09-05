/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const { setGame, setBoard, setPlayers } = require('../process/gameboard.module');
const { updateBoard, getBoard, saveBoard } = require('./board.module');
const { chipSelect } = require('../process/gameprocess.module');

// Llama a los eventos de creacion del juego
const createGameBoard = (room, width = 8, height = 8, player = 2) => {
  const prevBoard = getBoard(room);
  let mesa;
  // Si la mesa de juego no existe crea una nueva
  if (prevBoard === undefined) {
    const board = setBoard(width, height);
    const players = setPlayers(player);
    const game = setGame(width, height, board, players);
    saveBoard(room, player, game);
    mesa = { turn: 1, board: game };
  } else {
    mesa = { turn: prevBoard.turn, board: prevBoard.board };
  }
  return mesa;
};


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

function getGameBoard (io, data) {
// data.board.forEach(element => console.log(element));
  const globalBoard = getBoard(data.room);

  // console.log(io.sockets.adapter.rooms.get(data.room).size);

  // console.log(data.room);
  const sendedBoard = data.board;
  // console.log(JSON.stringify(globalBoard));
  // console.log(JSON.stringify(sendedBoard));

  // if(data.room = )

  // if (cooldownClick === false) {
  // cooldownClick = true;

  // console.log('----------------------------');
  // console.log(globalBoard);
  // console.log('----------------------------');
  if (globalBoard.board !== undefined) {

    if (JSON.stringify(globalBoard.board) === JSON.stringify(sendedBoard)) {

      const newBoard = chipSelect(JSON.parse(JSON.stringify(sendedBoard)), data.col, data.row);
      const processList = getProcess(newBoard.process);

      // Cambia el turno del jugador
      // console.log(globalBoard.turn);
      let turno = (globalBoard.turn + 1);
      if (turno > globalBoard.players) {
        turno = turno - globalBoard.players;
      }

      const response = { turn: turno, row: data.row, col: data.col, board: newBoard.board, process: processList }; // board: originalBoard
      updateBoard(data.room, turno, newBoard.board);
      return response;
      // => io.sockets.in(data.room).emit('add-dot-receiver', response);

      // console.log('enviado iguales');
      // cooldownClick = false;
    } else {

      const response = { turn: data.turn, row: data.row, col: data.col, board: data.board, process: [] };
      return response;
      // => io.sockets.in(data.room).emit('add-dot-receiver', response);
      // console.log('enviado diferentes');
      // cooldownClick = false;
    }
  } else {
    const response = { turn: data.turn, row: data.row, col: data.col, board: globalBoard.board, process: [] };
    return response;

  }
  // } else {
  // const response = { turn: globalBoard.turn, row: data.row, col: data.col, board: data.board, process: [] };
  // io.sockets.emit('add-dot-receiver', response);
  // io.sockets.in(data.room).emit('add-dot-receiver', response);
  // console.log('turno prueba');
  // setTimeout(() => { cooldownClick = false; }, 500);

  // }
}


module.exports = { createGameBoard, getGameBoard };
