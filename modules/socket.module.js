/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const socketIO = require('socket.io');
const http     = require('http');
const { getBoard, updateBoard } = require('./clonium.module');

const { chipSelect } = require('../components/clonium/gameprocess.component');

const SocketConnect = (app, port) => {

  const server = http.createServer(app);
  // const server = http.Server(app);

  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
  });

  server.listen(port, function () {
    console.log('Servidor corriendo en http://localhost:' + port);
  });

  io.on('connection', (socket) => {

    // socket.on('mensaje', (laik, id) => {
    //   io.emit(id, laik);
    // });

    // const messages = [
    //   {
    //     author: 'Carlos',
    //     text: 'Hola! que tal?'
    //   },
    //   {
    //     author: 'Pepe',
    //     text: 'Muy bien! y tu??'
    //   },
    //   {
    //     author: 'Paco',
    //     text: 'Genial!'
    //   }
    // ];

    // socket.emit('messages', messages);

    // function diferences (array, copy) {
    //   const copyList = [];

    //   copy.forEach((row, rkey) => {
    //     const localList = [];
    //     row.forEach((col, ckey) => {
    //       const copycol = array[rkey][ckey];
    //       if (col.value !== copycol.value || col.player !== copycol.player) {
    //         localList.push(col);
    //       }
    //     });
    //     copyList.push(localList);
    //   });

    //   return copyList;
    // }

    socket.on('join-room', (room) => {
      socket.join(room);
    });

    function process (array) {
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

    let turnoPrueba = false;

    socket.on('add-dot-emitter', (data) => {
      // data.board.forEach(element => console.log(element));
      const globalBoard = getBoard(data.room);

      // console.log(data.room);
      const sendedBoard = data.board;
      // console.log(JSON.stringify(globalBoard));
      // console.log(JSON.stringify(sendedBoard));

      // if(data.room = )

      if (turnoPrueba === false) {
        turnoPrueba = true;

        // console.log('----------------------------');
        // console.log(globalBoard);
        // console.log('----------------------------');

        if (JSON.stringify(globalBoard.board) === JSON.stringify(sendedBoard)) {

          const newBoard = chipSelect(JSON.parse(JSON.stringify(sendedBoard)), data.col, data.row);
          const processList = process(newBoard.process);

          // Cambia el turno del jugador
          // console.log(globalBoard.turn);
          let turno = (globalBoard.turn + 1);
          if (turno > globalBoard.players) {
            turno = turno - globalBoard.players;
          }

          const response = { turn: turno, row: data.row, col: data.col, board: newBoard.board, process: processList }; // board: originalBoard
          updateBoard(data.room, turno, newBoard.board);
          io.sockets.in(data.room).emit('add-dot-receiver', response);

          // console.log('enviado iguales');
          turnoPrueba = false;
        } else {

          const response = { turn: globalBoard.turn, row: data.row, col: data.col, board: globalBoard.board, process: [] };
          io.sockets.in(data.room).emit('add-dot-receiver', response);
          // console.log('enviado diferentes');
          turnoPrueba = false;

        }
      } else {
        const response = { turn: globalBoard.turn, row: data.row, col: data.col, board: data.board, process: [] };
        // io.sockets.emit('add-dot-receiver', response);
        io.sockets.in(data.room).emit('add-dot-receiver', response);
        // console.log('turno prueba');
        setTimeout(() => { turnoPrueba = false; }, 500);

      }
    });

  });

  // server.listen(3000, () => {
  //   console.log('funca');
  // });

  // app.get('port')
};

module.exports = { SocketConnect };
