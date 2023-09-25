import "./styles.css";
import React from "react";
import img1 from "./NIT_Silchar_logo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="mainintro">
        <h1> NATIONAL INSTITUTE OF TECHNOLOGY , SILCHAR </h1>
        <img src={img1} />
        <h1> DEPARTMENT OF ELECTRICAL ENGINEERING </h1>
        <h1> VIRTUAL LAB </h1>
      </div>
      <div className="sideintro">
        <p>Under Supervision of DR RAJEEB DEY </p>
        <p>Created by Kartik Bamal & Subrat Borgohain </p>
      </div>
      <h1> LIST OF EXPERIMENTS </h1>
      <p>
        1.<Link to="/HomeOhm">Ohm's Law</Link>
      </p>
      <p>
        2.<Link to="/HomeThevenin">Thevenin's Theorem</Link>
      </p>
    </div>
  );
}
