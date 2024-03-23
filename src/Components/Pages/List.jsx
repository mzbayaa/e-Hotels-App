import React from "react";
import { Navbar } from "../Navbar";
import Header from "../Header";
import "./List.css";

export const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
    </div>
  );
};
