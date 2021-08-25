const express = require('express');
const path = require('path');
const middlewares = require('./modules/middlewares');
const { randomPokemon, verifResponse } = require('./modules/functions');

const app = express();
const port = process.env.PORT || 4000;

// View engine setup
app.set('view engine', 'ejs');

app.use('/javascript', express.static(path.join(__dirname, '/resources/js')));
app.use(middlewares);

app.get('/', (req, res) => {
  res.render('page/clonium');
});

app.get('/pokemon', async (req, res) => {
  res.render('page/index');
});

app.get('/random', async (req, res) => {
  const pokem = await randomPokemon();

  req.session.pokename = pokem.name;

  res.send(JSON.stringify(pokem));
});

app.post('/respuesta', (req, res) => {
  const respuesta = req.body.response.toLowerCase();
  const pokename = req.session.pokename.toLowerCase();

  res.send(JSON.stringify({ message: verifResponse(pokename, respuesta) }));
  // res.render('page/return',{ 'mensaje' : mensaje });
});

app.listen(port, () => console.log('Example app listening on port port!'));

// app.set('resources', __dirname + '/resources')
// app.set('page','../views');
// app.set('views', path.join(__dirname, '../views'));

// const middlewares = [
//     layout(),
//     express.static(path.join(__dirname, 'js')),
// ];

// app.use(middlewares);
