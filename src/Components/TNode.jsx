import React, { Component } from "react";
import "./TNode.css";

export default class TNode extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      onClick,
    } = this.props;

    const extraClassName = isStart
      ? "TNode-start"
      : isFinish
      ? "TNode-finish"
      : "";

    return (
      <div
        // id={`node-${row}-${col}`}
        className={`TNode ${extraClassName}`}
        onClick={() => onClick(row, col)}
      ></div>
    );
  }
}
