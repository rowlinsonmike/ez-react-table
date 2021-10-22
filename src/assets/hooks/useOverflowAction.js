import { useRef, useEffect } from "react";

function checkOverflow(el) {
  const curOverflow = el.style.overflow;
  if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";
  const isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
  el.style.overflow = curOverflow;
  return isOverflowing;
}

const useOverflowAction = (actionFunction) => {
  const ref = useRef();
  useEffect(() => {
    if (checkOverflow(ref.current)) {
      actionFunction(ref);
    }
  }, [ref]);
  return ref;
};
export default useOverflowAction;
