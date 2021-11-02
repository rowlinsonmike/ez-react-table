import React from "react";
import Styled from './styled'
const Wrapper = ({children}) => <Styled className="ezr-title">{children}</Styled>;
export default function Title({ children }) {
  if (!children) {
    return null;
  }
  if (typeof children === "string") {
    return (
      <Wrapper>
        <h2 className="ezr-title--text">{children}</h2>
      </Wrapper>
    );
  }
  if (typeof children === "function") {
    const TitleComponent = children;
    return (
      <Wrapper>
        <TitleComponent />
      </Wrapper>
    );
  }
  return null;
}
