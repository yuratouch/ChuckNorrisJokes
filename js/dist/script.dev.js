"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jokesFav = exports.jokesAll = exports.jokeForm = void 0;

var _form = require("./form.js");

var _jokes = require("./jokes.js");

var jokeForm = new _form.Form('joke', "https://api.chucknorris.io/jokes/"),
    jokesAll = document.querySelector('#jokes #all'),
    jokesFav = document.querySelector('#jokes #favourites');
exports.jokesFav = jokesFav;
exports.jokesAll = jokesAll;
exports.jokeForm = jokeForm;

_jokes.Jokes.favourite();