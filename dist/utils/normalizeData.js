"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var normalizeData = function normalizeData() {
  var cols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _data = data.map(function (d) {
    var normalizedDataItem = cols.reduce(function (a, c) {
      if (c["render"]) {
        a[c["key"]] = c["render"](d[c["key"]], d);
      } else {
        a[c["key"]] = d[c["key"]];
      }

      return a;
    }, {});
    normalizedDataItem.__proto__.data = d;
    return normalizedDataItem;
  });

  return _data;
};

var _default = normalizeData;
exports["default"] = _default;