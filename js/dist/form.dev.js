"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _joke = require("./joke.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form =
/*#__PURE__*/
function () {
  function Form(id, api) {
    _classCallCheck(this, Form);

    this.el = document.querySelector("#".concat(id));
    this.api = api;
    this.getCategories();
    this.el.addEventListener('submit', this.submit.bind(this));
  }

  _createClass(Form, [{
    key: "submit",
    value: function submit(e) {
      var type, url, except, category, searchInput, joke;
      return regeneratorRuntime.async(function submit$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              type = document.querySelector('input[name=joke__type]:checked');
              url = this.api, except = true;
              _context.t0 = type.value;
              _context.next = _context.t0 === 'random' ? 6 : _context.t0 === 'categories' ? 8 : _context.t0 === 'search' ? 11 : 14;
              break;

            case 6:
              url += 'random';
              return _context.abrupt("break", 14);

            case 8:
              category = document.querySelector('input[name=category]:checked');
              url += "random?category=".concat(category.value);
              return _context.abrupt("break", 14);

            case 11:
              searchInput = document.querySelector('#searchInput');

              if (!searchInput.value) {
                except = false;
                searchInput.focus();
              } else {
                url += "search?query=".concat(searchInput.value);
                searchInput.value = "";
              }

              return _context.abrupt("break", 14);

            case 14:
              if (!except) {
                _context.next = 19;
                break;
              }

              _context.next = 17;
              return regeneratorRuntime.awrap(this.request(url));

            case 17:
              joke = _context.sent;

              if (joke.result) {
                if (joke.result.length > 0) {
                  joke = joke.result.map(function (joke) {
                    return new _joke.Joke(joke);
                  });
                }
              } else {
                joke = new _joke.Joke(joke);
              }

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "request",
    value: function request(url) {
      var xhr, data;
      return regeneratorRuntime.async(function request$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(fetch(url));

            case 2:
              xhr = _context2.sent;
              _context2.next = 5;
              return regeneratorRuntime.awrap(xhr.json());

            case 5:
              data = _context2.sent;
              return _context2.abrupt("return", data);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      var categories, categoriesList;
      return regeneratorRuntime.async(function getCategories$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.request("".concat(this.api, "categories")));

            case 2:
              categories = _context3.sent;
              categories = categories.map(function (category, index) {
                return "<label>\n\t\t\t\t\t\t\t\t\t\t<div class=\"btns__style\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" value=\"".concat(category, "\" \n\t\t\t\t\t\t\t\t\t\t\tname=\"category\" ").concat(index === 0 ? 'checked' : '', ">\n\t\t\t\t\t\t\t\t\t\t\t").concat(category, "\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</label>");
              }).join('');
              categoriesList = document.querySelector('div#categories');
              categoriesList.innerHTML = categories;

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Form;
}();

exports.Form = Form;