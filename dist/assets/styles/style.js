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

var getColor = function getColor(_ref2) {
  var darkMode = _ref2.config.darkMode;

  if (!darkMode) {
    return "#1e2026";
  } else {
    return "#fff";
  }
};

var getBorderColor = function getBorderColor(_ref3) {
  var darkMode = _ref3.config.darkMode;

  if (!darkMode) {
    return "#7a7f8f";
  } else {
    return "#484848";
  }
};

var getShadow = function getShadow(_ref4) {
  var darkMode = _ref4.config.darkMode;

  if (darkMode) {
    return "box-shadow: rgb(200 200 200/ 25%) 0px 50px 50px -10px, rgb(255 255 255 / 30%) 0px 30px 20px -30px, rgb(180 180 180 / 35%) 0px -2px 2px 0px inset;";
  } else {
    return "box-shadow: rgb(50 50 93 / 25%) 0px 50px 50px -10px, rgb(0 0 0 / 30%) 0px 30px 20px -30px, rgb(10 37 64 / 35%) 0px -2px 2px 0px inset;";
  }
};

var getBackgroundColor = function getBackgroundColor(_ref5) {
  var darkMode = _ref5.config.darkMode;

  if (darkMode) {
    return "background: #1e2026;";
  } else {
    return "background: #fff;";
  }
};

var getFontColor = function getFontColor(_ref6) {
  var darkMode = _ref6.config.darkMode;

  if (darkMode) {
    return "color: #fff;";
  } else {
    return "color: #1e2026;";
  }
};

var getScrollBarColor = function getScrollBarColor(_ref7) {
  var darkMode = _ref7.config.darkMode;

  if (darkMode) {
    return "\n    .simplebar-scrollbar::before {\n        background-color: #fff !important;\n    }\n    ";
  } else {
    return "\n    .simplebar-scrollbar::before {\n        background-color: #1e2026 !important;\n    }\n    ";
  }
};

var _default = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    *{\n        box-sizing: border-box;\n    }\n    svg{\n        fill: ", ";\n    }\n    ", "\n    .ezr-table{\n        ", "\n        border-radius: 7px;\n        width: ", "px;\n        ", "\n    }\n    .ezr-title{\n      .ezr-title--text{\n        ", "\n      }\n    }\n    .ezr-header{\n        display: flex;\n        padding-bottom: 15px;\n        &:hover{\n            cursor: pointer;\n        }\n        .ezr-header-left,.ezr-header-right{\n            width: 50%;\n        }\n        .ezr-header-right{\n            display: flex;\n            align-items: center;\n            justify-content: flex-end;\n            padding-right: 10px;\n        }\n    }\n\n    .ezr-search{\n        border-radius: 7px;\n        position: relative;\n        max-width: 50vw;\n        width: 100%;\n        margin: 10px 0 0 10px;\n        overflow: hidden;\n        ", "\n        height: 35px;\n        background: #fff;\n        input {\n            width: calc(100% - 45px);\n            border: none;\n            outline: none;\n            background: transparent;\n            height: 100%;\n            padding-left: 10px;\n            line-height: 30px;\n            font-size: 16px;\n        }\n        button {\n            border: none;\n            outline: none;\n            background: transparent;\n            top: 5px;\n            bottom: 0;\n            right: 5px;\n            height: 100%;\n            position: absolute;\n            width: 30px;\n            height: 30px;\n        }\n    }\n    .ezr-search-icon{\n        fill: #1e2026;\n    }\n    .ezr-refresh{\n        position: relative;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        @keyframes rotation {\n            100% {transform: scale(80%) rotate(-360deg);}\n        }\n        button{\n            ", "\n            border: none;\n            outline: none;\n            background: transparent;\n            top: 10px;\n            bottom: 0;\n            right: 5px;\n            height: 80%;\n            position: absolute;\n            line-height: 2rem;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            border-radius: 7px;\n            .loader{\n                width: 20px;\n                height: 20px;\n                border: 2px solid ", ";\n                border-radius: 50%;\n                animation: spin 5s linear infinite;\n                position: relative; \n                background: transparent;\n                &:before{\n                    content: \"\";\n                    display: block;\n                    background: transparent;\n                    width: 5px;\n                    height: 5px;\n                    border-top: 2px solid ", ";\n                    border-right: 2px solid ", ";\n                    position: absolute;\n                    top: 0px;\n                    left: -3px;\n                    box-shadow: 4px -4px 0 1px ", ";\n                }\n\n                @keyframes spin {\n                    0% {\n                        transform: rotate(0deg);\n                    }\n                    100% {\n                        transform: rotate(360deg);\n                    }\n                }\n            }\n        }\n    }\n    .ezr-count{\n        display: flex;\n        align-items: center;\n        strong{\n            font-size: 25px;\n            color: #b8b8b8;\n        }\n        img{\n            height: 18px;\n            width: 18px;\n        }\n    }\n    .ezr-col-header{\n        padding: 0 10px;\n        line-height: 2rem;\n        margin-bottom: 10px;\n        user-select: none;\n        display: flex;\n        cursor: pointer;\n        align-items: center;\n        transition: 0.3s;\n        border-bottom: 1px solid ", ";\n        .ezr-col-header-cell{\n            display: flex;\n            position: relative;\n            align-items: center;\n            font-weight: bold;\n            padding-left: 10px;\n            ", "\n            & > *+*{\n                margin-left: 5px;\n            }\n        }\n    }\n    .ezr-row{\n        padding: 0 10px;\n        &:hover {\n            background: rgba(219, 219, 219, 50%);\n            cursor: pointer;\n        }\n\n        display: flex;\n        cursor: pointer;\n        align-items: center;\n        transition: 0.3s;\n        .ezr-row-cell{\n            ", "\n        }\n    }\n    .ezr-footer{\n        border-top: 1px solid ", ";\n        display: flex;\n        padding: 15px 0;\n        justify-content: center;\n        color: ", ";\n        & > *+*{\n            margin-left: 5px;\n        }\n    }\n"])), config("accentColor"), getScrollBarColor, getShadow, config("tableWidth"), getBackgroundColor, getFontColor, getShadow, getShadow, getColor, getColor, getColor, function (_ref8) {
  var darkMode = _ref8.config.darkMode;
  return !darkMode ? "#fff" : "#1e2026";
}, getBorderColor, getFontColor, getFontColor, getBorderColor, config("accentColor"));

exports["default"] = _default;