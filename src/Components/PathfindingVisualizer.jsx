import React, { Component } from "react";
import TNode from "./TNode";
import "../grid.css";

const startX = 7;
const startY = 30;
const finishX = 25;
const finishY = 30;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.setState = {
      grid: [],
    };
  }

  // componentDidMount() {
  //   const grid = getGrid();
  //   this.setState({ grid });
  // }

  render() {
    return (
      <div className="grid">
        {getGrid().map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish, isVisited } = node;
                return (
                  <TNode
                    key={nodeIndex}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                  ></TNode>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const getGrid = () => {
  const grid = [];

  for (let i = 0; i < 20; i++) {
    const currentRow = [];
    for (let j = 0; j < 50; j++) {
      currentRow.push(createNode(i, j));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (row, col) => {
  return {
    row: row,
    col: col,
    isStart: row == startX && col == startY,
    isFinish: row == finishX && col == finishY,
    isVisited: false,
  };
};