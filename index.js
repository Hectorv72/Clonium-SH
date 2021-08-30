/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */

const express           = require('express');
const path              = require('path');
const middlewares       = require('./modules/middlewares.module');
const routes            = require('./routes/clonium.routes');
const { SocketConnect } = require('./modules/socket.module');

const app           = express();
const port          = process.env.PORT || 4000;
// const routes = require('./routes/routes'); app.use(routes); rutas = require('express').Router
// const morgan = require('morgan');

// View engine setup
app.set('view engine', 'ejs');
app.set('port', port);

app.use('/javascript', express.static(path.join(__dirname, '/resources/js')));
app.use(middlewares);
// console.log('espaciado buenardo');
// console.log(routes);
app.use('/clonium', routes);

app.listen(port, () => console.log('Example app listening on port port!'));

// Socket
SocketConnect(app);
