"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _templateObject,_styledComponents=_interopRequireDefault(require("styled-components"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _taggedTemplateLiteral(a,b){return b||(b=a.slice(0)),Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))}var getArrowStyles=function(a){var b=a.direction;if(!b)return"\n    opacity: 0;\n    transform: scale(50%);\n    ";var c="descend"===b?"180deg":"0";return"\n        opacity: 1;\n        transform: scale(50%) rotate(".concat(c,")\n        ")},Styled=_styledComponents["default"].span(_templateObject||(_templateObject=_taggedTemplateLiteral(["\n  position: absolute;\n  top: 5%;\n  right: 5%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  svg {\n    transition: opacity 300ms, transform 300ms;\n    ","\n  }\n"])),getArrowStyles),_default=Styled;exports["default"]=_default;