import React, { useState, useEffect } from "react";

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
          <div
            className="loader"
            style={{
              animationPlayState: loading ? "running" : "paused",
            }}
          />
        </button>
      )}
    </div>
  );
}
