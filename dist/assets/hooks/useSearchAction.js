"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useDebounce = _interopRequireDefault(require("./useDebounce"));

var _normalizeData = _interopRequireDefault(require("../../utils/normalizeData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSearchAction = function useSearchAction(fields, data) {
  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useState3 = (0, _react.useState)((0, _normalizeData["default"])(fields, data)),
      _useState4 = _slicedToArray(_useState3, 2),
      results = _useState4[0],
      setResults = _useState4[1];

  var debouncedSearchTerm = (0, _useDebounce["default"])(searchTerm, 500);

  var _fields = fields.map(function (f) {
    return f.key;
  });

  function find(items, text) {
    text = text.toLowerCase().split(" ");
    return items.filter(function (item) {
      return text.every(function (el) {
        return _fields.some(function (field) {
          return String(item[field]).toLowerCase().indexOf(el) > -1;
        });
      });
    });
  }

  (0, _react.useEffect)(function () {
    return setResults((0, _normalizeData["default"])(fields, data));
  }, [data]);
  (0, _react.useEffect)(function () {
    if (debouncedSearchTerm) {
      setResults((0, _normalizeData["default"])(fields, find(data, debouncedSearchTerm)));
    } else {
      setResults((0, _normalizeData["default"])(fields, data));
    }
  }, [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  if (!_fields) {
    return [function () {
      return null;
    }, data];
  }

  return [{
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    }
  }, results];
};

var _default = useSearchAction;
exports["default"] = _default;