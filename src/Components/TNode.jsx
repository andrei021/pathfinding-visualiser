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
      isWall,
      onClick,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    const extraClassName = isStart
      ? "TNode-start"
      : isFinish
      ? "TNode-finish"
      : isWall
      ? "TNode-wall"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`TNode ${extraClassName}`}
        onClick={() => onClick(row, col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}