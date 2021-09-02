/* eslint-disable import/no-absolute-path */
import { arrayGame, roomKey, updateBoard, setBoard } from '/javascript/board.js';
import { renderProcess, updateTurn } from '/javascript/socketgame.js';
// eslint-disable-next-line no-undef
const socket = io.connect(`http://${location.host}`, { forceNew: true });

// Valida que no se presionen fichas durante el proceso de renderizado
let globalAwait = false;

function setAwait (bol) {
  globalAwait = bol;
}

// Emite el mensaje al servidor sobre la ficha presionada
function sendAddDotPosition (col, row) {
  socket.emit('add-dot-emitter', { room: roomKey, board: arrayGame, col: col, row: row });
  setAwait(true);
};

// Se une a la sala
function joinRoom (room) {
  socket.emit('join-room', room);
}

// Procesa los datos recibidos
socket.on('add-dot-receiver', (data) => {
  updateTurn(data.turn);

  if (data.process.length > 0) {
    updateBoard(data.board);
    renderProcess(data.board, data.process);
  } else {
    setBoard(data.board);
  }
});

export { sendAddDotPosition, joinRoom, globalAwait, setAwait };
