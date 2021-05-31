import {Form} from './form.js';
import {Jokes} from './jokes.js';

export let jokeForm = new Form('joke', `https://api.chucknorris.io/jokes/`),
    jokesAll = document.querySelector('#jokes #all'),
    jokesFav = document.querySelector('#jokes #favourites');

Jokes.favourite();