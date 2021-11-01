"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var normalizeData = function normalizeData() {
  var cols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _data = data.map(function (d) {
    var normalizedDataItem = Object.create(_objectSpread({}, d));
    cols.forEach(function (c) {
      if (c["render"]) {
        normalizedDataItem[c.key] = c.render(d[c.key], d);
      } else {
        normalizedDataItem[c.key] = d[c.key];
      }
    });
    return normalizedDataItem;
  });

  return _data;
};

var _default = normalizeData;
exports["default"] = _default;