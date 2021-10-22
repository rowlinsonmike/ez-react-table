import styled from "styled-components";

const getArrowStyles = ({ direction }) => {
  if (!direction) {
    return `
    opacity: 0;
    transform: scale(50%);
    `;
  } else {
    const deg = direction === "descend" ? "180deg" : "0";
    return `
        opacity: 1;
        transform: scale(50%) rotate(${deg})
        `;
  }
};
const Styled = styled.span`
  position: absolute;
  top: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    transition: opacity 300ms, transform 300ms;
    ${getArrowStyles}
  }
`;

export default Styled;
