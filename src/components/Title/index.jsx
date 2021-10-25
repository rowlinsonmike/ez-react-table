import React from "react";
import Styled from './styled'
const Wrapper = (props) => <Styled className="ezr-title" {...props} />;
export default function Title({ title }) {
  if (!title) {
    return null;
  }
  if (typeof title === "string") {
    return (
      <Wrapper>
        <h2 className="ezr-title--text">{title}</h2>
      </Wrapper>
    );
  }
  if (typeof title === "function") {
    const TitleComponent = title;
    return (
      <Wrapper>
        <TitleComponent />
      </Wrapper>
    );
  }
  return null;
}
