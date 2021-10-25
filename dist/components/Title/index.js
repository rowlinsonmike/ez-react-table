"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Title;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("./styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Wrapper = function Wrapper(props) {
  return /*#__PURE__*/_react["default"].createElement(_styled["default"], _extends({
    className: "ezr-title"
  }, props));
};

function Title(_ref) {
  var title = _ref.title;

  if (!title) {
    return null;
  }

  if (typeof title === "string") {
    return /*#__PURE__*/_react["default"].createElement(Wrapper, null, /*#__PURE__*/_react["default"].createElement("h2", {
      className: "ezr-title--text"
    }, title));
  }

  if (typeof title === "function") {
    var TitleComponent = title;
    return /*#__PURE__*/_react["default"].createElement(Wrapper, null, /*#__PURE__*/_react["default"].createElement(TitleComponent, null));
  }

  return null;
}