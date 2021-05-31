import {Joke} from './joke.js';

export class Form{
    constructor(id, api){
        this.el = document.querySelector(`#${id}`);
        this.api = api;

        this.getCategories();
        this.el.addEventListener('submit', this.submit.bind(this));
    }

    async submit(e){
        e.preventDefault();

        let type = document.querySelector('input[name=joke__type]:checked');

        let url = this.api,
            except = true;

        switch(type.value){
            case 'random':
                url += 'random';
                break;
            case 'categories':
                let category = document.querySelector('input[name=category]:checked');
                url += `random?category=${category.value}`;
                break;
            case 'search':
                let searchInput = document.querySelector('#searchInput');
                if(!searchInput.value){
                    except = false;
                    searchInput.focus();
                }else{
                    url += `search?query=${searchInput.value}`;
                    searchInput.value = "";
                }
                break;
        }

        if(except){
            let joke = await this.request(url);

            if(joke.result){
                if(joke.result.length>0){
                    joke = joke.result.map(joke => new Joke(joke))
                }
            } else{
                joke = new Joke(joke);
            }
        }
    }

    async request(url){
        let xhr = await fetch(url),
            data = await xhr.json();

        return data;
    }

    async getCategories(){
        let categories = await this.request(`${this.api}categories`);

        categories = categories
            .map((category, index) => `<label>
										<div class="btns__style">
											<input type="radio" value="${category}" 
											name="category" ${index===0 ? 'checked' : ''}>
											${category}
										</div>
									</label>`)
            .join('');

        let categoriesList = document.querySelector('div#categories');
        categoriesList.innerHTML = categories;
    }
}