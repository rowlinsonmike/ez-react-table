"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _simplebarReact = _interopRequireDefault(require("simplebar-react"));

require("simplebar/dist/simplebar.min.css");

var _StyledList = _interopRequireDefault(require("./assets/styles/StyledList"));

var _style = _interopRequireDefault(require("./assets/styles/style"));

var _useSearchAction3 = _interopRequireDefault(require("./assets/hooks/useSearchAction"));

var _sortData = _interopRequireDefault(require("./utils/sortData"));

var _Sort = _interopRequireDefault(require("./components/Sort"));

var _RowCell = _interopRequireDefault(require("./components/RowCell"));

var _Refresh = _interopRequireDefault(require("./components/Refresh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SearchSvg = function SearchSvg(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", props, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M15.853 16.56A9.458 9.458 0 0 1 9.5 19C4.257 19 0 14.743 0 9.5S4.257 0 9.5 0 19 4.257 19 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zM9.5 1C14.191 1 18 4.809 18 9.5S14.191 18 9.5 18 1 14.191 1 9.5 4.809 1 9.5 1z"
  }));
};

SearchSvg.defaultProps = {
  width: "24",
  height: "24",
  xmlns: "http://www.w3.org/2000/svg",
  fillRule: "evenodd",
  clipRule: "evenodd"
};

var EraserSvg = function EraserSvg(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", props, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M5.662 23 .293 17.635a.996.996 0 0 1 0-1.414L15.222 1.293a1.001 1.001 0 0 1 1.414 0l7.071 7.073a.994.994 0 0 1 .293.708.995.995 0 0 1-.293.707L12.491 21h5.514v2H5.662zm3.657-2-5.486-5.486-1.419 1.414L6.49 21h2.829zm.456-11.429-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z"
  }));
};

EraserSvg.defaultProps = {
  width: "24",
  height: "24",
  xmlns: "http://www.w3.org/2000/svg",
  fillRule: "evenodd",
  clipRule: "evenodd"
};

var EzReactTable = function EzReactTable(_ref) {
  var data = _ref.data,
      cols = _ref.cols,
      rowHeight = _ref.rowHeight,
      tableHeight = _ref.tableHeight,
      update = _ref.update,
      defaultSort = _ref.defaultSort,
      accentColor = _ref.accentColor,
      darkMode = _ref.darkMode;

  var _useSearchAction = (0, _useSearchAction3["default"])(cols, data),
      _useSearchAction2 = _slicedToArray(_useSearchAction, 2),
      searchInputProps = _useSearchAction2[0],
      _data = _useSearchAction2[1];

  var _useState = (0, _react.useState)(defaultSort ? [defaultSort, "descend"] : null),
      _useState2 = _slicedToArray(_useState, 2),
      sort = _useState2[0],
      setSort = _useState2[1];

  var _dataset = (0, _sortData["default"])(_data, sort, setSort);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_style["default"], {
    config: {
      tableWidth: cols.reduce(function (a, c) {
        return a + c.width;
      }, 0) + 50,
      accentColor: accentColor,
      darkMode: darkMode
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-table"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-header-left"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-search"
  }, /*#__PURE__*/_react["default"].createElement("input", _extends({}, searchInputProps, {
    className: "ezr-search-input",
    type: "text"
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      if (searchInputProps.value.length) {
        searchInputProps.onChange({
          target: {
            value: ""
          }
        });
      }
    }
  }, searchInputProps.value.length ? /*#__PURE__*/_react["default"].createElement(EraserSvg, {
    className: "ezr-search-icon",
    style: {
      transform: "scale(70%)"
    }
  }) : /*#__PURE__*/_react["default"].createElement(SearchSvg, {
    className: "ezr-search-icon",
    style: {
      transform: "scale(70%)"
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-header-right"
  }, /*#__PURE__*/_react["default"].createElement(_Refresh["default"], {
    data: data,
    update: update
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-body"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-col-header"
  }, cols.map(function (c, idx) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: idx,
      style: {
        height: "".concat(rowHeight, "px"),
        width: "".concat(c.width, "px")
      },
      className: "ezr-col-header-cell",
      onClick: function onClick() {
        if (sort && sort[0] === c.key) {
          setSort([c.key, sort[1] === "ascend" ? "descend" : "ascend"]);
        } else {
          setSort([c.key, "descend"]);
        }
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: _objectSpread({}, c.center ? {
        width: "100%",
        textAlign: "center"
      } : {})
    }, c.title), /*#__PURE__*/_react["default"].createElement(_Sort["default"], {
      direction: sort && sort[0] === c.key ? sort[1] : null
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-rows"
  }, /*#__PURE__*/_react["default"].createElement(_simplebarReact["default"], {
    style: {
      height: "".concat(tableHeight, "px")
    }
  }, function (_ref2) {
    var scrollableNodeRef = _ref2.scrollableNodeRef,
        contentNodeRef = _ref2.contentNodeRef;
    return /*#__PURE__*/_react["default"].createElement(_StyledList["default"], {
      innerRef: contentNodeRef,
      outerRef: scrollableNodeRef,
      height: tableHeight,
      width: "100%",
      itemCount: _dataset.length,
      itemSize: rowHeight
    }, function (_ref3) {
      var index = _ref3.index,
          style = _ref3.style;
      var item = _dataset[index];
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread({}, style),
        key: index,
        className: "ezr-row"
      }, Object.keys(item).map(function (k, idx) {
        var _cols$idx;

        var textAlign = (_cols$idx = cols[idx]) !== null && _cols$idx !== void 0 && _cols$idx.center ? "center" : "initial";
        return /*#__PURE__*/_react["default"].createElement(_RowCell["default"], {
          key: idx,
          style: {
            textAlign: textAlign,
            width: "".concat(cols[idx].width, "px")
          },
          value: item[k]
        });
      }));
    });
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ezr-footer"
  }, /*#__PURE__*/_react["default"].createElement("span", null, _dataset.length), /*#__PURE__*/_react["default"].createElement("span", null, "items"))));
};

EzReactTable.defaultProps = {
  cols: [],
  data: [],
  rowHeight: 50,
  tableHeight: 300,
  update: null,
  defaultSort: null,
  accentColor: "#b8b8b8",
  darkMode: false
};
EzReactTable.propTypes = {
  cols: _propTypes["default"].array,
  data: _propTypes["default"].array,
  rowHeight: _propTypes["default"].number,
  tableHeight: _propTypes["default"].number,
  update: _propTypes["default"].func,
  defaultSort: _propTypes["default"].string,
  accentColor: _propTypes["default"].string,
  darkMode: _propTypes["default"].bool
};
var _default = EzReactTable;
exports["default"] = _default;