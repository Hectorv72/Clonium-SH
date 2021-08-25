const partials = require('express-partials');
const session = require('express-session');
const express = require('express');

const oneDay = 1000 * 60 * 60 * 24;

const pack = [
  express.urlencoded({ extended: false }),
  partials(),
  express.json(),
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  })
  // ('/javascript',express.static(__dirname + '/resources/js')),
];

module.exports = pack;
