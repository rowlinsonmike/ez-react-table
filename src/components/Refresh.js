import React, { useState, useEffect } from "react";
import { ReactComponent as RefreshSvg } from "../assets/svg/refresh.svg";

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
    <div className="ezr-refresh">
      {update && (
        <button
          disabled={loading}
          {...(update ? { onClick: updateHandler } : {})}
        >
          <RefreshSvg
            className="ezr-refresh--icon"
            style={{ transform: "scale(70%)" }}
            style={
              loading
                ? {
                    animation: "spin 5s linear infinite backwards",
                  }
                : {}
            }
          />
          {/* <div
            className="loader"
            style={{
              animationPlayState: loading ? "running" : "paused",
            }}
          /> */}
        </button>
      )}
    </div>
  );
}
