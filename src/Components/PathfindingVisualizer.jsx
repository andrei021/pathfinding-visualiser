import React, { Component } from "react";
import TNode from "./TNode";
import "../grid.css";

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.setState = {
            grid: []
        };
    }

  render() {
    return <div className="grid"></div>;
  }
}