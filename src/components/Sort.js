import React from "react";
import Styled from "../assets/styles/Sort";
import { ReactComponent as SortSvg } from "../assets/svg/sort.svg";

export default function Sort({ direction }) {
  return (
    <Styled direction={direction} className={`${direction}`}>
      <SortSvg />
    </Styled>
  );
}
