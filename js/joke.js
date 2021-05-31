import {Jokes} from './jokes.js';
import {jokesAll, jokesFav} from './script.js';

export class Joke{
    constructor(joke){
        this.create(joke);
        this.render();
    }

    create(joke){
        for(let key in joke){
            this[key] = joke[key];
        }
    }

    render(){
        let data = [];

        for(let key in this){
            if (key == "id") {
                data.push(`<p class="joke-id">ID: <a target="_blank" href="${this.url}">${this[key]}</a></p>`);

            } else if (key == "value") {
                data.push(`<p class="joke-text">${this[key]}</p>`);

            } else if (key == "categories" && this[key].length != 0) {
                data.push(`<p class="joke-category">Category: ${this[key]}</p>`);

            } else if (key == "created_at") {
                data.push(`<p class="joke-date">Created at: ${this[key].slice(0, 10)}</p>`);
            } 
        }

        let chuckAva = document.createElement('img');
        chuckAva.src = `${this.icon_url}`;
        chuckAva.classList.add("joke-ava");

        let favBtn = document.createElement('button');
        favBtn.className = ('fav-btn');
        favBtn.innerHTML = this.favourite ? `<i class="fas fa-heart"></i>` : `<i class="far fa-heart"></i>`;
        favBtn.dataset.favourite = this.favourite ? true : false;

        favBtn.addEventListener('click',this.addFavourite.bind(this));

        let favBtnContainer = document.createElement('div');
        favBtnContainer.classList.add("fav-btn-container");
        favBtnContainer.append(chuckAva);
        favBtnContainer.append(favBtn);

        let singleJoke = document.createElement('div');
        singleJoke.dataset.id = this.id;
        singleJoke.className = 'single-joke';
        singleJoke.innerHTML = data.join('');
        singleJoke.prepend(favBtnContainer);

        this.favourite ? jokesFav.append(singleJoke) : jokesAll.append(singleJoke);
    }

    addFavourite(){

        let jokeBtn = jokesAll.querySelector(`div[data-id="${this.id}"] button`);
        console.log(jokeBtn);

        let storageJokes = localStorage.getItem('favJokes');
        storageJokes = storageJokes ? JSON.parse(storageJokes) : {};

        if(jokeBtn && jokeBtn.dataset.favourite==="false"){
            this.favourite = true;
            jokeBtn.innerHTML = `<i class="fas fa-heart"></i>`;
            jokeBtn.dataset.favourite = true;
            storageJokes[this.id] = this;
        } else{
            if(jokeBtn){
                jokeBtn.innerHTML = `<i class="far fa-heart"></i>`;
                jokeBtn.dataset.favourite = false;
            }
            this.favourite = false;
            delete storageJokes[this.id];
        }

        localStorage.setItem('favJokes', JSON.stringify(storageJokes) );
        Jokes.favourite();
    }
}