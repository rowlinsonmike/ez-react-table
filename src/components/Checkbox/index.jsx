import React from "react";
import Styled from "./styled";

export default function Checkbox({onChecked,onUnchecked,checked,...props}) {
  return (
    <Styled {...props} className="ezr-row--selector">
      <label className="form-control">
        <input checked={checked} onChange={e => {
            if(e.target.checked){
                onChecked()
            }else{
                onUnchecked()
            }
        }} type="checkbox" name="checkbox" />
      </label>
    </Styled>
  );
}
