import React from "react";

export default function ToolbarButton({ children, className = "", ...rest }) {
  return (
    <button {...rest} className={`ezr-toolbar--button ${className}`}>
      {children}
    </button>
  );
}
