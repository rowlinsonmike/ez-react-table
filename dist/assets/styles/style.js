"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = require("styled-components");

require("./vars.css");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var config = function config(attr) {
  return function (_ref) {
    var config = _ref.config;
    return config[attr];
  };
};

var getBackgroundColor = function getBackgroundColor(_ref2) {
  var darkMode = _ref2.config.darkMode;

  if (darkMode) {
    return "background: #1e2026;";
  } else {
    return "background: #fff;";
  }
};

var getFontColor = function getFontColor(_ref3) {
  var darkMode = _ref3.config.darkMode;

  if (darkMode) {
    return "color: #fff;";
  } else {
    return "color: #1e2026;";
  }
};

var getScrollBarColor = function getScrollBarColor(_ref4) {
  var darkMode = _ref4.config.darkMode;

  if (darkMode) {
    return "\n    .simplebar-scrollbar::before {\n        background-color: #fff !important;\n    }\n    ";
  } else {
    return "\n    .simplebar-scrollbar::before {\n        background-color: #1e2026 !important;\n    }\n    ";
  }
};

var _default = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    *{\n        box-sizing: border-box;\n    }\n    svg{\n        fill: ", ";\n    }\n    ", "\n    .ezr-table{\n        box-shadow: var(--shadow);\n        border-radius: 7px;\n        width: ", "px;\n        ", "\n    }\n    .ezr-header{\n        display: flex;\n        padding-bottom: 15px;\n        border-bottom: 1px solid #eee;\n        &:hover{\n            cursor: pointer;\n        }\n        .ezr-header-left,.ezr-header-right{\n            width: 50%;\n        }\n        .ezr-header-right{\n            display: flex;\n            align-items: center;\n            justify-content: flex-end;\n            padding-right: 10px;\n        }\n    }\n\n    .ezr-search{\n        border-radius: 7px;\n        position: relative;\n        max-width: 50vw;\n        width: 100%;\n        margin: 10px 0 0 10px;\n        overflow: hidden;\n        box-shadow: var(--shadow);\n        height: 35px;\n        background: #fff;\n        input {\n            width: calc(100% - 45px);\n            border: none;\n            outline: none;\n            background: transparent;\n            height: 100%;\n            padding-left: 10px;\n            line-height: 30px;\n            font-size: 16px;\n        }\n        button {\n            border: none;\n            outline: none;\n            background: transparent;\n            top: 0;\n            bottom: 0;\n            right: 5px;\n            height: 100%;\n            position: absolute;\n            width: 30px;\n            height: 30px;\n            line-height: 2rem;\n        }\n    }\n    .ezr-search-icon{\n        fill: #1e2026;\n    }\n    .ezr-refresh{\n        position: relative;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        @keyframes rotation {\n            100% {transform: scale(80%) rotate(-360deg);}\n        }\n        button{\n            border: none;\n            outline: none;\n            background: transparent;\n            top: 10px;\n            bottom: 0;\n            right: 5px;\n            height: 100%;\n            position: absolute;\n            line-height: 2rem;\n            svg{\n                transform: scale(80%);\n                animation: rotation 1s linear infinite forwards;\n            }\n        }\n    }\n    .ezr-count{\n        display: flex;\n        align-items: center;\n        strong{\n            font-size: 25px;\n            color: #b8b8b8;\n        }\n        img{\n            height: 18px;\n            width: 18px;\n        }\n    }\n    .ezr-col-header{\n        padding: 0 10px;\n        line-height: 2rem;\n        margin-bottom: 10px;\n        user-select: none;\n        display: flex;\n        cursor: pointer;\n        align-items: center;\n        transition: 0.3s;\n        border-bottom: 1px solid #eee;\n        .ezr-col-header-cell{\n            display: flex;\n            position: relative;\n            align-items: center;\n            font-weight: bold;\n            padding-left: 10px;\n            ", "\n            & > *+*{\n                margin-left: 5px;\n            }\n        }\n    }\n    .ezr-row{\n        padding: 0 10px;\n        &:hover {\n            background: rgba(219, 219, 219, 50%);\n            cursor: pointer;\n        }\n\n        display: flex;\n        cursor: pointer;\n        align-items: center;\n        transition: 0.3s;\n        .ezr-row-cell{\n            ", "\n        }\n    }\n    .ezr-footer{\n        border-top: 1px solid #eee;\n        display: flex;\n        padding: 15px 0;\n        justify-content: center;\n        color: ", ";\n        & > *+*{\n            margin-left: 5px;\n        }\n    }\n"])), config("accentColor"), getScrollBarColor, config("tableWidth"), getBackgroundColor, getFontColor, getFontColor, config("accentColor"));

exports["default"] = _default;