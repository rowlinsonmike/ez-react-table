"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getArrowStyles = function getArrowStyles(_ref) {
  var direction = _ref.direction;

  if (!direction) {
    return "\n    opacity: 0;\n    transform: scale(50%);\n    ";
  } else {
    var deg = direction === "descend" ? "180deg" : "0";
    return "\n        opacity: 1;\n        transform: scale(50%) rotate(".concat(deg, ")\n        ");
  }
};

var Styled = _styledComponents["default"].span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5%;\n  right: 5%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  svg {\n    transition: opacity 300ms, transform 300ms;\n    ", "\n  }\n"])), getArrowStyles);

var _default = Styled;
exports["default"] = _default;