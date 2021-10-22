"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Sort;

var _react = _interopRequireDefault(require("react"));

var _Sort = _interopRequireDefault(require("../assets/styles/Sort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SortSvg = function SortSvg(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", props, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M11.574 3.712a.5.5 0 0 1 .857 0l9.37 15.545a.5.5 0 0 1-.429.757l-18.668-.006a.5.5 0 0 1-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111L.33 18.52c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472L13.969 2.34a2.273 2.273 0 0 0-1.966-1.111z"
  }));
};

SortSvg.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24"
};

function Sort(_ref) {
  var direction = _ref.direction;
  return /*#__PURE__*/_react["default"].createElement(_Sort["default"], {
    direction: direction,
    className: "".concat(direction)
  }, /*#__PURE__*/_react["default"].createElement(SortSvg, null));
}