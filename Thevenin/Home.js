import React, { useState } from "react";
import "./styles.css";
import img1 from "./1_1.png";
import img2 from "./1_equiv.png";
import img3 from "./circuit (1).png";
import img4 from "./circuit (5).png";
import img5 from "./circuit (6).png";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import BasicTable from "./Table";

export default function Home() {
  //console.log((3 * 4) / (3 + 4));

  const navigate = useNavigate();

  var [currentState, setState] = useState({
    infinite: "INFINITE",
    div: 1,
    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
    rth: 0,
    voltage: 0,
    voltage_th: 0,
    equivalent_r: 0,
    loadcurrent: "NOT DEFINED",
    loadcurrent_th: "NOT DEFINED",
    data1: [],
    data2: [],
    columns1: [
      {
        Header: "loadcurrent",
        accessor: "loadcurrent" // accessor is the "key" in the data
      },
      {
        Header: "equivalent_r",
        accessor: "equivalent_r"
      },

      {
        Header: "voltage",
        accessor: "voltage"
      },
      {
        Header: "r1",
        accessor: "r1"
      },
      {
        Header: "r2",
        accessor: "r2"
      },
      {
        Header: "r3",
        accessor: "r3"
      },
      {
        Header: "r4",
        accessor: "r4"
      }
    ],
    columns2: [
      {
        Header: "loadcurrent_th",
        accessor: "loadcurrent_th"
      },
      {
        Header: "voltage_th",
        accessor: "voltage_th"
      },
      {
        Header: "rth",
        accessor: "rth"
      }
    ]
  });

  function theory() {
    navigate("/TheoryThevenin", {
      replace: true
    });
  }

  function fnr1(event) {
    return Number(event);
  }

  function fnr2(event) {
    return Number(event);
  }

  function fnr3(event) {
    return Number(event);
  }

  function fnr4(event) {
    return Number(event);
  }

  function fnvoltage(event) {
    return Number(event);
  }

  function fnparallel(r1, r2) {
    return (r1 * r2) / (r1 + r2);
  }

  function fnrth(parallel, r3) {
    return (isNaN(parallel) ? 0 : parallel) + r3;
  }

  function fnvth(voltage, r2, r1) {
    return isNaN((voltage * r2) / (r1 + r2))
      ? voltage
      : (voltage * r2) / (r1 + r2);
  }

  function fnloadcurrent_th(vth, rth, r4) {
    return isNaN(vth / (rth + r4))
      ? vth === 0
        ? "Not defined"
        : "infinite"
      : vth / (rth + r4);
  }

  function fnequivalent_r(r1, r2, r3, r4) {
    return (
      r1 +
      (isNaN((r2 * (r3 + r4)) / (r2 + r3 + r4))
        ? 0
        : (r2 * (r3 + r4)) / (r2 + r3 + r4))
    );
  }

  function fnloadcurrent(voltage, r2, equivalent_r, r3, r4) {
    return isNaN((voltage * r2) / (equivalent_r * (r2 + r3 + r4)))
      ? voltage === 0
        ? "Not defined"
        : "Infinite"
      : (voltage * r2) / (equivalent_r * (r2 + r3 + r4));
  }

  function handleUpdateVoltage(event) {
    var r1 = fnr1(currentState.r1);
    var r2 = fnr2(currentState.r2);
    var r3 = fnr3(currentState.r3);
    var r4 = fnr4(currentState.r4);
    var voltage = fnvoltage(event);
    var parallel = fnparallel(r1, r2);
    var rth = fnrth(parallel, r3);
    var vth = fnvth(voltage, r2, r1);
    var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
    var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
    var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
    setState((prevState) => {
      return {
        ...prevState,
        voltage: event,
        voltage_th: vth,
        loadcurrent: loadcurrent,
        loadcurrent_th: loadcurrent_th,
        equivalent_r: equivalent_r
        //  current: event / (currentState.rth + currentState.r4)
      };
    });
  }

  function handleUpdater1(event) {
    var r1 = Number(event);
    var r2 = Number(currentState.r2);
    var r3 = Number(currentState.r3);
    var r4 = Number(currentState.r4);
    var voltage = Number(currentState.voltage);
    var parallel = fnparallel(r1, r2);
    var rth = fnrth(parallel, r3);
    var vth = fnvth(voltage, r2, r1);
    var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
    var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
    var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
    console.log(rth + "rth");
    console.log(parallel + "parallel");
    console.log(event + "r1");
    console.log(currentState.r2 + "r2");
    console.log(currentState.r3 + "r3");

    setState((prevState) => {
      return {
        ...prevState,
        r1: event,
        rth: rth,
        voltage: voltage,
        voltage_th: vth,
        loadcurrent: loadcurrent,
        loadcurrent_th: loadcurrent_th,

        equivalent_r: equivalent_r
      };
    });
  }

  function handleUpdater2(event) {
    var r1 = Number(currentState.r1);
    var r2 = Number(event);
    var r3 = Number(currentState.r3);
    var r4 = Number(currentState.r4);
    var voltage = Number(currentState.voltage);
    var parallel = fnparallel(r1, r2);
    var rth = fnrth(parallel, r3);
    var vth = fnvth(voltage, r2, r1);
    var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
    var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
    var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
    console.log(rth + "rth");
    console.log(parallel + "parallel");
    console.log(currentState.r1 + "r1");
    console.log(event + "r2");
    console.log(currentState.r3 + "r3");
    setState((prevState) => {
      return {
        ...prevState,
        r2: event,
        rth: rth,
        voltage: voltage,
        voltage_th: vth,
        loadcurrent: loadcurrent,
        loadcurrent_th: loadcurrent_th,
        equivalent_r: equivalent_r
        // current: currentState.voltage / (rth + currentState.r4)
      };
    });
  }

  function handleUpdater3(event) {
    var r1 = Number(currentState.r1);
    var r2 = Number(currentState.r2);
    var r3 = Number(event);
    var r4 = Number(currentState.r4);
    var voltage = Number(currentState.voltage);
    var parallel = fnparallel(r1, r2);
    var rth = fnrth(parallel, r3);
    var vth = fnvth(voltage, r2, r1);
    var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
    var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
    var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
    console.log(rth + "rth");
    console.log(parallel + "parallel");
    console.log(currentState.r1 + "r1");
    console.log(currentState.r2 + "r2");
    console.log(event + "r3");
    setState((prevState) => {
      return {
        ...prevState,
        r3: event,
        rth: rth,
        voltage: voltage,
        voltage_th: vth,
        loadcurrent: loadcurrent,
        loadcurrent_th: loadcurrent_th,
        equivalent_r: equivalent_r

        // current: currentState.voltage / (rth + currentState.r4)
      };
    });
  }

  function handleUpdater4(event) {
    var r1 = Number(currentState.r1);
    var r2 = Number(currentState.r2);
    var r3 = Number(currentState.r3);
    var r4 = Number(event);
    var voltage = Number(currentState.voltage);
    var parallel = fnparallel(r1, r2);
    var rth = fnrth(parallel, r3);
    var vth = fnvth(voltage, r2, r1);
    var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
    var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
    var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
    setState((prevState) => {
      return {
        ...prevState,
        r4: event,
        rth: rth,
        voltage: voltage,
        voltage_th: vth,
        loadcurrent: loadcurrent,
        loadcurrent_th: loadcurrent_th,
        equivalent_r: equivalent_r

        // current: currentState.voltage / (rth + event)
      };
    });
  }

  function backToMain() {
    navigate("/Home", {
      replace: true
    });
  }

  function addData() {
    var data1 = [
      ...currentState.data1,
      {
        loadcurrent: currentState.loadcurrent,

        voltage: currentState.voltage,

        equivalent_r: currentState.equivalent_r,
        r1: currentState.r1,
        r2: currentState.r2,
        r3: currentState.r3,
        r4: currentState.r4
      }
    ];

    var data2 = [
      ...currentState.data2,
      {
        loadcurrent_th: currentState.loadcurrent_th,
        voltage_th: currentState.voltage_th,
        rth: currentState.rth
      }
    ];
    setState((prevState) => {
      return {
        ...prevState,
        data1: [...data1],
        data2: [...data2]
      };
    });
  }

  function changeDiv(event) {
    setState((prevState) => {
      return {
        ...prevState,
        div: event
      };
    });
  }

  return (
    <div>
      <button
        onClick={() => {
          backToMain();
        }}
      >
        {" "}
        BACK TO MAIN PAGE{" "}
      </button>
      <button
        onClick={() => {
          theory();
        }}
      >
        {" "}
        THEORY{" "}
      </button>
      {currentState.div === 1 ? (
        <div>
          {" "}
          <img src={img1} />
          <h1>VOLTAGE</h1>
          <Slider
            min={0}
            max={50}
            value={currentState.voltage}
            handleUpdate={handleUpdateVoltage}
          />
          <h1>R1</h1>
          <Slider
            min={0}
            max={100}
            value={currentState.r1}
            handleUpdate={handleUpdater1}
          />
          <h1>R2</h1>
          <Slider
            min={0}
            max={100}
            value={currentState.r2}
            handleUpdate={handleUpdater2}
          />
          <h1>R3</h1>
          <Slider
            min={0}
            max={100}
            value={currentState.r3}
            handleUpdate={handleUpdater3}
          />
          <h1>R4(LOAD)</h1>
          <Slider
            min={0}
            max={100}
            value={currentState.r4}
            handleUpdate={handleUpdater4}
          />{" "}
          <p></p>
        </div>
      ) : currentState.div === 2 ? (
        <div>
          <img src={img2} />

          <h1>Rth {currentState.rth} ohm</h1>
          <h1>R4 {currentState.r4} ohm</h1>
          <h1>Vth {currentState.voltage_th} V</h1>
          <h1>Ith {currentState.loadcurrent_th}A</h1>
        </div>
      ) : currentState.div === 3 ? (
        <div>
          <img src={img3} />
          <h1> Rth = R3 + (R1*R2)/(R1+R2) </h1>
          <h1> R1={currentState.r1} ohm</h1>
          <h1> R2={currentState.r2} ohm</h1>
          <h1> R3={currentState.r3} ohm</h1>
          <h1>
            Rth ={" "}
            {currentState.r1 === 0 && currentState.r2 === 0
              ? currentState.r3
              : currentState.rth}{" "}
            ohm
          </h1>
        </div>
      ) : currentState.div === 4 ? (
        <div>
          <img src={img4} />
          <h1> Vth = Voltage across R2 </h1>
          <h1> Vth={currentState.voltage_th} V</h1>
        </div>
      ) : (
        <div>
          <img src={img5} />
          <h1> LOAD CURRENT={currentState.loadcurrent} A</h1>
        </div>
      )}
      <button
        onClick={() => {
          changeDiv(1);
        }}
      >
        {" "}
        MAIN CIRCUIT{" "}
      </button>
      <button
        onClick={() => {
          changeDiv(2);
        }}
      >
        {" "}
        EQUIVALENT CIRCUIT{" "}
      </button>
      <button
        onClick={() => {
          changeDiv(3);
        }}
      >
        {" "}
        RTH CIRCUIT{" "}
      </button>
      <button
        onClick={() => {
          changeDiv(4);
        }}
      >
        {" "}
        VTH CIRCUIT{" "}
      </button>
      <button
        onClick={() => {
          changeDiv(5);
        }}
      >
        {" "}
        LOAD CURRENT{" "}
      </button>
      <button
        onClick={() => {
          addData();
        }}
      >
        {" "}
        ADD TO TABLE{" "}
      </button>
      <div className="table1">
        <p> TABLE 1 (MAIN CIRCUIT) </p>
        <BasicTable columns={currentState.columns1} data={currentState.data1} />
      </div>
      <div className="table2">
        <p> TABLE 2 (THEVENIN'S EQUIVALENT CIRCUIT)</p>
        <BasicTable columns={currentState.columns2} data={currentState.data2} />
      </div>
    </div>
  );
}
