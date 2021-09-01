// const socket = new WebSocket('ws://localhost:3000');

// socket.onopen = () => {
//   socket.send('Hello!');
// };

// socket.onmessage = (data) => {
//   console.log(data);
// };
// eslint-disable-next-line import/no-absolute-path
// import { addDot } from '/javascript/chips.js';
// eslint-disable-next-line import/no-absolute-path
import { arrayGame, roomKey, updateBoard, setBoard } from '/javascript/board.js';
// eslint-disable-next-line import/no-absolute-path
import { renderProcess, updateTurn } from '/javascript/socketgame.js';
// eslint-disable-next-line no-undef
const socket = io.connect(`http://${location.host}`, { forceNew: true });

let globalAwait = false;

function sendAddDotPosition (col, row) {
  // console.log(clickCount);
  // emitAddDot(col, row);
  socket.emit('add-dot-emitter', { room: roomKey, board: arrayGame, col: col, row: row });
  globalAwait = true;
  // console.log({ board: arrayGame, col: col, row: row });
};

function joinRoom (room) {
  socket.emit('join-room', room);
}

socket.on('add-dot-receiver', (data) => {
  // console.log(data);
  // console.log(arrayGame);
  globalAwait = false;

  // resetClickCount();
  // if (arrayGame !== data.board) {
  //   setBoard(data.board);
  // }
  // console.log(data.process.length);
  if (data.process.length > 0) {
    // console.log(data);
    // console.log(data.board);
    // console.log(data.process);
    updateTurn(data.turn);
    // console.log(data.turn);
    updateBoard(data.board);
    renderProcess(data.board, data.process);
    // console.log(arrayGame);
  } else {
    // console.log(data.board);
    updateTurn(data.turn);
    // console.log(data.turn);
    setBoard(data.board);
  }
  // addDot(data.board, data.col, data.row);
});

// socket.on('board', (board) => {
//   setBoard(board);
// });
// socket.on('messages', function (data) {
//   render(data);
// });

// function render (data) {
//   const html = data
//     .map(function (elem, index) {
//       return `<div>
//                  <strong>${elem.author}</strong>:
//                  <em>${elem.text}</em>
//         </div>`;
//     })
//     .join(' ');

//   document.getElementById('messages').innerHTML = html;
// }

// function addMessage (e) {
//   const mensaje = {
//     author: document.getElementById('username').value,
//     text: document.getElementById('texto').value
//   };

//   socket.emit('new-message', mensaje);
//   //   console.log(socket);
//   return false;
// }

export { sendAddDotPosition, joinRoom, globalAwait };
