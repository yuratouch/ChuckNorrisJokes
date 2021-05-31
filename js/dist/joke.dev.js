"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Joke = void 0;

var _jokes = require("./jokes.js");

var _script = require("./script.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joke =
/*#__PURE__*/
function () {
  function Joke(joke) {
    _classCallCheck(this, Joke);

    this.create(joke);
    this.render();
  }

  _createClass(Joke, [{
    key: "create",
    value: function create(joke) {
      for (var key in joke) {
        this[key] = joke[key];
      }
    }
  }, {
    key: "render",
    value: function render() {
      var data = [];

      for (var key in this) {
        if (key == "id") {
          data.push("<p class=\"joke-id\">ID: <a target=\"_blank\" href=\"".concat(this.url, "\">").concat(this[key], "</a></p>"));
        } else if (key == "value") {
          data.push("<p class=\"joke-text\">".concat(this[key], "</p>"));
        } else if (key == "categories" && this[key].length != 0) {
          data.push("<p class=\"joke-category\">Category: ".concat(this[key], "</p>"));
        } else if (key == "created_at") {
          data.push("<p class=\"joke-date\">Created at: ".concat(this[key].slice(0, 10), "</p>"));
        }
      }

      var chuckAva = document.createElement('img');
      chuckAva.src = "".concat(this.icon_url);
      chuckAva.classList.add("joke-ava");
      var favBtn = document.createElement('button');
      favBtn.className = 'fav-btn';
      favBtn.innerHTML = this.favourite ? "<i class=\"fas fa-heart\"></i>" : "<i class=\"far fa-heart\"></i>";
      favBtn.dataset.favourite = this.favourite ? true : false;
      favBtn.addEventListener('click', this.addFavourite.bind(this));
      var favBtnContainer = document.createElement('div');
      favBtnContainer.classList.add("fav-btn-container");
      favBtnContainer.append(chuckAva);
      favBtnContainer.append(favBtn);
      var singleJoke = document.createElement('div');
      singleJoke.dataset.id = this.id;
      singleJoke.className = 'single-joke';
      singleJoke.innerHTML = data.join('');
      singleJoke.prepend(favBtnContainer);
      this.favourite ? _script.jokesFav.append(singleJoke) : _script.jokesAll.append(singleJoke);
    }
  }, {
    key: "addFavourite",
    value: function addFavourite() {
      var jokeBtn = _script.jokesAll.querySelector("div[data-id=\"".concat(this.id, "\"] button"));

      console.log(jokeBtn);
      var storageJokes = localStorage.getItem('favJokes');
      storageJokes = storageJokes ? JSON.parse(storageJokes) : {};

      if (jokeBtn && jokeBtn.dataset.favourite === "false") {
        this.favourite = true;
        jokeBtn.innerHTML = "<i class=\"fas fa-heart\"></i>";
        jokeBtn.dataset.favourite = true;
        storageJokes[this.id] = this;
      } else {
        if (jokeBtn) {
          jokeBtn.innerHTML = "<i class=\"far fa-heart\"></i>";
          jokeBtn.dataset.favourite = false;
        }

        this.favourite = false;
        delete storageJokes[this.id];
      }

      localStorage.setItem('favJokes', JSON.stringify(storageJokes));

      _jokes.Jokes.favourite();
    }
  }]);

  return Joke;
}();

exports.Joke = Joke;