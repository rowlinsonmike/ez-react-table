"use strict";var _react=require("react");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f=[],g=!0,h=!1;try{for(c=c.call(a);!(g=(d=c.next()).done)&&(f.push(d.value),!(b&&f.length===b));g=!0);}catch(a){h=!0,e=a}finally{try{g||null==c["return"]||c["return"]()}finally{if(h)throw e}}return f}}function _arrayWithHoles(a){if(Array.isArray(a))return a}function useDebounce(a,b){// State and setters for debounced value
var c=(0,_react.useState)(a),d=_slicedToArray(c,2),e=d[0],f=d[1];return(0,_react.useEffect)(function(){// Update debounced value after delay
var c=setTimeout(function(){f(a)},b);// Cancel the timeout if value changes (also on delay change or unmount)
// This is how we prevent debounced value from updating if value is changed ...
// .. within the delay period. Timeout gets cleared and restarted.
return function(){clearTimeout(c)}},[a,b]// Only re-call effect if value or delay changes
),e}var _default=useDebounce;exports["default"]=_default;