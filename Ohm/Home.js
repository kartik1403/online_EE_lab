import React, { useState } from "react";
import img1 from "./basiccircuit.png";
import { useNavigate } from "react-router-dom";
import BasicTable from "./Table";
import Slider from "./Slider";
import Graph from "./Graph";
export default function Home() {
  const navigate = useNavigate();

  var [currentState, setState] = useState({
    graphPlot: false,
    graphValidity: true,
    resistance: 0,
    voltage: 0,
    current: "NOT DEFINED",
    varray: [],
    carray: [],
    rarray: [],
    data: [],
    columns: [
      {
        Header: "current",
        accessor: "current" // accessor is the "key" in the data
      },
      {
        Header: "voltage",
        accessor: "voltage"
      },
      {
        Header: "resistance",
        accessor: "resistance"
      }
    ]
  });

  function handleUpdateVoltage(event) {
    var voltage = Number(event);
    setState((prevState) => {
      return {
        ...prevState,
        voltage: event,
        current: isNaN(event / currentState.resistance)
          ? voltage === 0
            ? "NOT DEFINED"
            : "INFINITE"
          : event / currentState.resistance
      };
    });
  }

  function handleUpdateResistance(event) {
    var voltage = Number(currentState.voltage);
    if (event === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          graphValidity: false
        };
      });
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          resistance: event,
          current: isNaN(currentState.voltage / event)
            ? voltage === 0
              ? "NOT DEFINED"
              : "INFINITE"
            : currentState.voltage / event
        };
      });
    }
  }

  function handleChange(event) {
    var { name, value } = event.target;
    var new_current = currentState.current;
    if (name === "voltage") {
      new_current = value / currentState.resistance;
    } else {
      new_current = currentState.voltage / value;
    }
    setState((prevState) => {
      return { ...prevState, [name]: value, current: new_current };
    });
  }

  function resetData() {
    setState(() => {
      return {
        graphPlot: false,
        graphValidity: true,
        resistance: 0,
        voltage: 0,
        current: 0,
        varray: [],
        carray: [],
        rarray: [],
        data: [],
        columns: [
          {
            Header: "current",
            accessor: "current" // accessor is the "key" in the data
          },
          {
            Header: "voltage",
            accessor: "voltage"
          },
          {
            Header: "resistance",
            accessor: "resistance"
          }
        ]
      };
    });
  }

  function plotGraph() {
    // console.log(currentState.varray);
    // console.log(currentState.carray);
    /* navigate("/Graph", {
      state: {
        voltageData: [...currentState.varray],
        currentData: [...currentState.carray],
        data: [...currentState.data]
      },
      replace: true
    });*/
    setState((prevState) => {
      return {
        ...prevState,
        graphPlot: true
      };
    });
  }

  function backToHome() {
    setState((prevState) => {
      return {
        ...prevState,
        graphPlot: false
      };
    });
  }

  function backToMain() {
    navigate("/Home", {
      replace: true
    });
  }

  function sortDataAscending(data) {
    data.sort((a, b) => (a.voltage > b.voltage ? 1 : -1));
    setState((prevValue) => {
      return {
        ...prevValue,
        data: [...data]
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let voltage = Number(currentState.voltage);
    let resistance = Number(currentState.resistance);
    if (resistance === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          graphValidity: false
        };
      });
    } else {
      let current = voltage / resistance;
      let carray = [...currentState.carray, current];
      let varray = [...currentState.varray, voltage];
      let rarray = [...currentState.rarray, resistance];
      let data = [
        ...currentState.data,
        {
          current: current,
          voltage: voltage,
          resistance: resistance
        }
      ];
      setState((prevState) => {
        return {
          ...prevState,
          current: current,
          carray: [...carray],
          varray: [...varray],
          rarray: [...rarray],
          data: [...data]
        };
      });
      sortDataAscending(data);
    }
  }

  if (!currentState.graphPlot) {
    if (!currentState.graphValidity) {
      return (
        <div>
          <h1> INVALID DATA </h1>
          <button
            onClick={() => {
              resetData();
            }}
          >
            Home
          </button>
        </div>
      );
    } else {
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
          <h1> OHM'S LAW </h1>
          <img src={img1} />
          <h1>VOLTAGE</h1>
          <Slider
            presentVal={currentState.voltage}
            handleUpdate={handleUpdateVoltage}
          />
          <h1>RESISTANCE</h1>
          <Slider
            presentVal={currentState.resistance}
            handleUpdate={handleUpdateResistance}
          />
          <p> KEEP RESISTANCE CONSTANT IN OHM'S LAW </p>
          <h1></h1>
          <h1></h1>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <input
              placeholder="voltage"
              type="number"
              name="voltage"
              value={currentState.voltage}
              onChange={(event) => {
                handleChange(event);
              }}
            />

            <input
              placeholder="resistance"
              type="number"
              name="resistance"
              value={currentState.resistance}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <button type="submit"> ADD TO TABLE </button>
          </form>
          <h1> VOLTAGE={currentState.voltage} V</h1>
          <h1> RESISTANCE={currentState.resistance} Ohm</h1>
          <h1>
            CURRENT=
            {currentState.current} A
          </h1>
          <p>TABLE</p>
          <BasicTable columns={currentState.columns} data={currentState.data} />
          <button
            onClick={() => {
              plotGraph();
            }}
          >
            {" "}
            Plot Data{" "}
          </button>
          <button
            onClick={() => {
              resetData();
            }}
          >
            {" "}
            Reset Data{" "}
          </button>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Graph
          voltageData={currentState.varray}
          currentData={currentState.carray}
          data={currentState.data}
        />
        <button
          onClick={() => {
            backToHome();
          }}
        >
          Home
        </button>
      </div>
    );
  }
}
