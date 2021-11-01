import React, { useState, useEffect } from "react";
import { ReactComponent as RefreshSvg } from "../assets/svg/refresh.svg";
import ToolbarButton from "./EzReactTable/ToolbarButton";
export default function Refresh({ update, data }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [data]);
  const updateHandler = () => {
    setLoading(true);
    update();
  };
  return (
    <ToolbarButton disabled={loading} onClick={updateHandler}>
      <RefreshSvg
        className="ezr-toolbar--refresh"
        style={{ transform: "scale(70%)" }}
        style={
          loading
            ? {
                animation: "spin 5s linear infinite backwards",
              }
            : {}
        }
      />
    </ToolbarButton>
  );
}
