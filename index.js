const express = require('express');
const path = require('path');
const middlewares = require('./modules/middlewares');
const socketIO = require('socket.io');
const http = require('http');
// const morgan = require('morgan');

// const { randomPokemon, verifResponse } = require('./modules/functions');

const app = express();
const port = process.env.PORT || 4000;

// View engine setup
app.set('view engine', 'ejs');
app.set('port', port);

app.use('/javascript', express.static(path.join(__dirname, '/resources/js')));
app.use(middlewares);

app.get('/', (req, res) => {
  res.render('page/index');
});

//

//

// Socket

app.listen(port, () => console.log('Example app listening on port port!'));

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('conectado');
  socket.on('mensaje', (laik, id) => {
    io.emit(id, laik);
  });
});

// server.listen(3000, () => {
//   console.log('funca');
// });

// app.get('port')
