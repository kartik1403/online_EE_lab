import "./styles.css";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./Home";
import HomeThevenin from "../Thevenin/Home";
import TheoryThevenin from "../Thevenin/Theory";
import HomeOhm from "../Ohm/Home";
import GraphOhm from "../Ohm/Graph";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/HomeThevenin" element={<HomeThevenin />} />
        <Route path="/TheoryThevenin" element={<TheoryThevenin />} />
        <Route path="/HomeOhm" element={<HomeOhm />} />
        <Route path="/GraphOhm" element={<GraphOhm />} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
      </Routes>
    </Router>
  );
}
