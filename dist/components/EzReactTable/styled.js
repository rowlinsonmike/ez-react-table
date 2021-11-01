"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modes = _defineProperty({
  bg: ["#fff", "#1f2024"],
  font: ["#1f2024", "#fff"],
  border: ["#cbd2d9", "#323f4b"],
  scroll: ["#323f4b", "#cbd2d9"]
}, "scroll", ["#323f4b", "#cbd2d9"]);

var getColor = function getColor(darkMode) {
  var index = 0;

  if (darkMode) {
    index = 1;
  }

  return Object.keys(modes).reduce(function (a, c) {
    a[c] = modes[c][index];
    return a;
  }, {});
};

var _default = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  /* keyframes */\n  @keyframes spin {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(-360deg);\n    }\n  }\n  /* general */\n  * {\n    box-sizing: border-box;\n  }\n  svg {\n    fill: ", ";\n  }\n  .simplebar-scrollbar::before {\n    background-color: ", " !important;\n  }\n  /* table */\n  .ezr-table {\n    box-shadow: #777 0px 1px 2px;\n    border-radius: 7px;\n    width: ", "px;\n    min-width: 300px;\n    background-color: ", ";\n  }\n  .ezr-title {\n    .ezr-title--text {\n      color: ", ";\n    }\n  }\n  .ezr-header {\n    display: flex;\n    padding-bottom: 15px;\n    &:hover {\n      cursor: pointer;\n    }\n    .ezr-header-left,\n    .ezr-toolbar {\n      width: 50%;\n    }\n    .ezr-toolbar {\n      display: flex;\n      align-items: center;\n      justify-content: flex-end;\n      padding-right: 10px;\n      & > * + * {\n        margin-left: 5px;\n      }\n      .ezr-toolbar--button {\n        box-shadow: ", "\n            0px 1px 3px,\n          ", "\n            0px 1px 2px;\n        border: none;\n        outline: none;\n        background: transparent;\n        top: 10px;\n        bottom: 0;\n        right: 5px;\n        height: 30px;\n        width: 40px;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: 7px;\n        i {\n        }\n        svg {\n        }\n      }\n    }\n  }\n\n  .ezr-search {\n    border-radius: 7px;\n    position: relative;\n    max-width: 50vw;\n    width: 100%;\n    margin: 10px 0 0 10px;\n    overflow: hidden;\n    box-shadow: ", "\n        0px 1px 3px,\n      ", "\n        0px 1px 2px;\n    height: 35px;\n    background: #fff;\n    input {\n      width: calc(100% - 45px);\n      border: none;\n      outline: none;\n      background: transparent;\n      height: 100%;\n      padding-left: 10px;\n      line-height: 30px;\n      font-size: 16px;\n    }\n    button {\n      border: none;\n      outline: none;\n      background: transparent;\n      top: 5px;\n      bottom: 0;\n      right: 5px;\n      height: 100%;\n      position: absolute;\n      width: 30px;\n      height: 30px;\n    }\n  }\n  .ezr-search-icon {\n    fill: #1e2026;\n  }\n  .ezr-count {\n    display: flex;\n    align-items: center;\n    strong {\n      font-size: 25px;\n      color: #b8b8b8;\n    }\n    img {\n      height: 18px;\n      width: 18px;\n    }\n  }\n  .ezr-col-header {\n    padding: 0 10px;\n    line-height: 2rem;\n    margin-bottom: 10px;\n    user-select: none;\n    display: flex;\n    cursor: pointer;\n    align-items: center;\n    transition: 0.3s;\n    border-bottom: 1px solid ", ";\n    .ezr-col-header-cell {\n      display: flex;\n      position: relative;\n      align-items: center;\n      font-weight: bold;\n      padding-left: 10px;\n      color: ", ";\n      & > * + * {\n        margin-left: 5px;\n      }\n    }\n  }\n  .ezr-row {\n    padding: 0 10px;\n    &:hover {\n      background: rgba(219, 219, 219, 50%);\n      cursor: pointer;\n    }\n\n    display: flex;\n    cursor: pointer;\n    align-items: center;\n    transition: 0.3s;\n    .ezr-row-cell {\n      color: ", ";\n    }\n  }\n  .ezr-footer {\n    border-top: 1px solid ", ";\n    display: flex;\n    padding: 15px 0;\n    justify-content: center;\n    color: ", ";\n    & > * + * {\n      margin-left: 5px;\n    }\n  }\n"])), function (_ref) {
  var accentColor = _ref.accentColor;
  return accentColor;
}, function (_ref2) {
  var accentColor = _ref2.accentColor;
  return accentColor || getColor(darkMode).scroll;
}, function (_ref3) {
  var tableWidth = _ref3.tableWidth;
  return tableWidth;
}, function (_ref4) {
  var darkMode = _ref4.darkMode;
  return getColor(darkMode).bg;
}, function (_ref5) {
  var darkMode = _ref5.darkMode;
  return getColor(darkMode).font;
}, function (_ref6) {
  var darkMode = _ref6.darkMode;
  return darkMode ? "rgba(0, 0, 0, 0.12)" : "rgba(50, 50, 93, 0.25)";
}, function (_ref7) {
  var darkMode = _ref7.darkMode;
  return darkMode ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.3)";
}, function (_ref8) {
  var darkMode = _ref8.darkMode;
  return darkMode ? "rgba(0, 0, 0, 0.12)" : "rgba(50, 50, 93, 0.25)";
}, function (_ref9) {
  var darkMode = _ref9.darkMode;
  return darkMode ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.3)";
}, function (_ref10) {
  var darkMode = _ref10.darkMode;
  return getColor(darkMode).border;
}, function (_ref11) {
  var darkMode = _ref11.darkMode;
  return getColor(darkMode).font;
}, function (_ref12) {
  var darkMode = _ref12.darkMode;
  return getColor(darkMode).font;
}, function (_ref13) {
  var darkMode = _ref13.darkMode;
  return getColor(darkMode).border;
}, function (_ref14) {
  var accentColor = _ref14.accentColor,
      darkMode = _ref14.darkMode;
  return accentColor || getColor(darkMode).font;
});

exports["default"] = _default;