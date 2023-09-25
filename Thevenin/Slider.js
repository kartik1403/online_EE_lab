import React, { useState, useEffect } from "react";
import "./styles2.css";
export default function App(props) {
  //console.log("slider");
  console.log(props.value);
  const [value, onChange] = useState(props.value);
  /*useEffect(() => {
    const ele = document.querySelector(".buble");
    if (ele) {
      ele.style.left = `${Number(value / 4)}px`;
    }
  });*/
  return (
    <div className="slider-parent">
      <input
        type="range"
        min="1"
        max={props.max}
        value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(radius);
          props.handleUpdate(radius);
        }}
      />
      <div className="buble">{value}</div>
    </div>
  );
}
