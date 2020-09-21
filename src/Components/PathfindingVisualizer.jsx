import React, { Component } from "react";
import TNode from "./TNode";
import "../grid.css";
import "../message.css";

let isStart = true;
let isFinish = false;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      startFinishIndexes: [],
      message: "choose start node",
      // mouseIsPressed: false
    };
  }

  componentDidMount() {
    const grid = getGrid();
    this.setState({ grid });
  }

  onClick(row, col) {
    if (isStart == true && isFinish == false) {
      this.state.startFinishIndexes.push(row);
      this.state.startFinishIndexes.push(col);

      const newGrid = getNewGrid(this.state.grid, row, col, isStart, isFinish);
      this.setState({ grid: newGrid });

      isStart = false;
      isFinish = true;
      this.state.message = "choose finish node";
    } else if (isStart == false && isFinish) {
      const node = this.state.grid[row][col];
      this.state.message = "put walls if you want to";

      if (!node.isStart) {
        this.state.startFinishIndexes.push(row);
        this.state.startFinishIndexes.push(col);
        const newGrid = getNewGrid(
          this.state.grid,
          row,
          col,
          isStart,
          isFinish
        );
        this.setState({ grid: newGrid });
        isFinish = false;
      }
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <div>
        <div className="message">
          <code>{this.state.message}</code>
        </div>

        <div className="large blue button">
          get path
        </div>

        <div className="grid">
          {grid.map((row, rowIndex) => {
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
                      onClick={(row, col) => this.onClick(row, col)}
                    ></TNode>
                  );
                })}
              </div>
            );
          })}
        </div>
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
    isStart: false,
    isFinish: false,
    isVisited: false,
  };
};

const getNewGrid = (grid, row, col, isStart, isFinish) => {
  if (isStart) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: isStart,
    };

    newGrid[row][col] = newNode;
    return newGrid;
  }

  if (isFinish) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: isFinish,
    };

    newGrid[row][col] = newNode;
    return newGrid;
  }
};
