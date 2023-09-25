import React, { useState } from "react";
import img1 from "./1_1.png";
import img2 from "./1_equiv.png";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

export default function Theory() {
  const navigate = useNavigate();
  function back() {
    navigate("/HomeThevenin", {
      replace: true
    });
  }
  return (
    <div>
      <button
        onClick={() => {
          back();
        }}
      >
        {" "}
        BACK{" "}
      </button>
      <div>
        <h3>
          <u> Procedure:</u>{" "}
        </h3>
        <p>
          Keep all the resistances{" "}
          <b>
            (R<sub>1</sub>, R<sub>2</sub>, R<sub>3</sub>, R<sub>L</sub>)
          </b>{" "}
          close to their respective maximum values. Choose any arbitrary value
          of <b>V</b>.{" "}
        </p>
        <h3> Experiment Theory: </h3>
        <b>Step 1:</b>
        <p>
          Disconnect R<sub>4</sub> and find the equivalent R<sub>th</sub> and V
          <sub>th</sub>.
        </p>
        <p>
          <b>Step 2:</b>
        </p>
        <b></b>
        <p>
          the equivalent R<sub>th</sub> will be found by short circuiting all
          independent voltage sources and open circuiting all current sources.
        </p>
        <p>
          <b>Step 3</b>
          <p>
            Divide V<sub>th</sub> by sum of R<sub>4</sub> and R<sub>th</sub> to
            obtain I<sub>th</sub>. This is the required current through the
            circuit.
          </p>
        </p>
        <p>
          <b>Step 4</b>
          <p>
            Compare I<sub>th</sub> with I<sub>l</sub> , if both are equal this
            verifies Thevenin's theorem
          </p>
        </p>
        N.B.:- All the resistances are in ohms.<p> </p>
      </div>
    </div>
  );
}
