"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function checkOverflow(el) {
  var curOverflow = el.style.overflow;
  if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";
  var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
  el.style.overflow = curOverflow;
  return isOverflowing;
}

var useOverflowAction = function useOverflowAction(actionFunction) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (checkOverflow(ref.current)) {
      actionFunction(ref);
    }
  }, [ref]);
  return ref;
};

var _default = useOverflowAction;
exports["default"] = _default;