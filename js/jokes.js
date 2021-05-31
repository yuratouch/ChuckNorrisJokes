import {Joke} from "./joke.js";
import {jokesFav} from './script.js';

export class Jokes{
    static favourite(){
        jokesFav.innerHTML = ``;
        let storageJokes = localStorage.getItem('favJokes');

        if(storageJokes){
            storageJokes = JSON.parse(storageJokes);

            for(let key in storageJokes){
                new Joke(storageJokes[key]);
            }
        }
    }
}
