"use strict";var _react=require("react");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f=[],g=!0,h=!1;try{for(c=c.call(a);!(g=(d=c.next()).done)&&(f.push(d.value),!(b&&f.length===b));g=!0);}catch(a){h=!0,e=a}finally{try{g||null==c["return"]||c["return"]()}finally{if(h)throw e}}return f}}function _arrayWithHoles(a){if(Array.isArray(a))return a}var useSort=function(){var a=(0,_react.useState)(!0),b=_slicedToArray(a,2),c=b[0],d=b[1],e=(0,_react.useState)(defaultSort),f=_slicedToArray(e,2),g=f[0],h=f[1],i=function(a){if(!g||!a||!a.length)return a;var b={string:function string(){return c?a.sort(function(c,a){return a[g]>c[g]?-1:c[g]>a[g]?1:0}):a.sort(function(c,a){return c[g]>a[g]?-1:a[g]>c[g]?1:0})},number:function number(){return c?a.sort(function(c,a){return a[g]-c[g]}):a.sort(function(c,a){return c[g]-a[g]})}};return b[_typeof(a[0][g])]?b[_typeof(a[0][g])]():(h(null),a)};return[i,g,c]},_default=useSort;exports["default"]=_default;