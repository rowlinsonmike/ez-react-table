import React from "react";
import useOverflowAction from "../assets/hooks/useOverflowAction";
import Styled from "../assets/styles/RowCell";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/animations/scale.css";

export default function RowCell({ value, ...rest }) {
  const overflowRef = useOverflowAction((ref) => {
    tippy(ref.current, {
      animation: "scale",
      placement: "top-start",
    });
  });
  return (
    <Styled
      data-tippy-content={value}
      className="ezr-row-cell"
      ref={overflowRef}
      {...rest}
    >
      {value}
    </Styled>
  );
}
