"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jokes = void 0;

var _joke = require("./joke.js");

var _script = require("./script.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Jokes =
/*#__PURE__*/
function () {
  function Jokes() {
    _classCallCheck(this, Jokes);
  }

  _createClass(Jokes, null, [{
    key: "favourite",
    value: function favourite() {
      _script.jokesFav.innerHTML = "";
      var storageJokes = localStorage.getItem('favJokes');

      if (storageJokes) {
        storageJokes = JSON.parse(storageJokes);

        for (var key in storageJokes) {
          new _joke.Joke(storageJokes[key]);
        }
      }
    }
  }]);

  return Jokes;
}();

exports.Jokes = Jokes;