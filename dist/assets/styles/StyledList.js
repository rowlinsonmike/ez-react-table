"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactWindow = require("react-window");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledList = (0, _styledComponents["default"])(_reactWindow.FixedSizeList)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  overflow-x: hidden !important;\n  scrollbar-width: thin;\n  scrollbar-color: transparent transparent;\n  /* hide native scrollbar */\n  &::-webkit-scrollbar {\n    width: 1px;\n  }\n  &::-webkit-scrollbar-track {\n    background: transparent;\n    box-shadow: none;\n  }\n  &::-webkit-scrollbar-thumb {\n    background-color: transparent;\n    box-shadow: none;\n  }\n"])));
var _default = StyledList;
exports["default"] = _default;