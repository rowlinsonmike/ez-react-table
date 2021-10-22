import styled from "styled-components";
import { FixedSizeList as List } from "react-window";

const StyledList = styled(List)`
  overflow-x: hidden !important;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }
`;

export default StyledList;
