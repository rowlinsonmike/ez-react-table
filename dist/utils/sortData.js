"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sortMap = {
  "boolean": function boolean(data, key, direction) {
    if (direction === "descend") {
      return data.sort(function (x) {
        return x.__proto__[key] ? -1 : 1;
      });
    } else {
      return data.sort(function (x) {
        return x.__proto__[key] ? 1 : -1;
      });
    }
  },
  string: function string(data, key, direction) {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        if (b[key] > a[key]) {
          return -1;
        }

        if (a[key] > b[key]) {
          return 1;
        }

        return 0;
      });
    } else {
      return data.sort(function (a, b) {
        if (a[key] > b[key]) {
          return -1;
        }

        if (b[key] > a[key]) {
          return 1;
        }

        return 0;
      });
    }
  },
  number: function number(data, key, direction) {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        return b[sort] - a[sort];
      });
    } else {
      return data.sort(function (a, b) {
        return a[sort] - b[sort];
      });
    }
  }
};

var sortData = function sortData(data, sort, setSort) {
  if (!sort || !(data !== null && data !== void 0 && data.length)) {
    return data;
  }

  var _sort = _slicedToArray(sort, 2),
      key = _sort[0],
      direction = _sort[1];

  if (sortMap[_typeof(data[0].__proto__[key])]) {
    return sortMap[_typeof(data[0].__proto__[key])](data, key, direction);
  } else {
    //reset sort if column is not sortable
    setSort(null);
    return data;
  }
};

var _default = sortData;
exports["default"] = _default;