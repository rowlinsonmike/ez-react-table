"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSort = function useSort() {
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      descend = _useState2[0],
      setDescend = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultSort),
      _useState4 = _slicedToArray(_useState3, 2),
      sort = _useState4[0],
      setSort = _useState4[1];

  var toggleSort = function toggleSort(newSort) {
    if (newSort !== sort) {
      setSort(newSort);
    }

    setDescend(newSort === sort ? !descend : true);
  };

  var sortData = function sortData(indexedData) {
    if (!sort || !indexedData || !indexedData.length) {
      return indexedData;
    }

    var sortMap = {
      string: function string() {
        if (descend) {
          return indexedData.sort(function (a, b) {
            if (b[sort] > a[sort]) {
              return -1;
            }

            if (a[sort] > b[sort]) {
              return 1;
            }

            return 0;
          });
        } else {
          return indexedData.sort(function (a, b) {
            if (a[sort] > b[sort]) {
              return -1;
            }

            if (b[sort] > a[sort]) {
              return 1;
            }

            return 0;
          });
        }
      },
      number: function number() {
        if (descend) {
          return indexedData.sort(function (a, b) {
            return b[sort] - a[sort];
          });
        } else {
          return indexedData.sort(function (a, b) {
            return a[sort] - b[sort];
          });
        }
      }
    };

    if (sortMap[_typeof(indexedData[0][sort])]) {
      return sortMap[_typeof(indexedData[0][sort])]();
    } else {
      //reset sort if column is not sortable
      setSort(null);
      return indexedData;
    }
  };

  return [sortData, sort, descend];
};

var _default = useSort;
exports["default"] = _default;