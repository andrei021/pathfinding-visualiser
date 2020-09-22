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
      buttonIsActive: "false",
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getGrid();
    this.setState({ grid });
  }

  onMouseDown(row, col) {
    let indexesLength = this.state.startFinishIndexes.length;
    if (indexesLength != 4) return;
    const newGrid = getNewGrid(this.state.grid, row, col, "isWall");
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  onMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGrid(this.state.grid, row, col, "isWall");
    this.setState({ grid: newGrid });
  }

  onMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  onClick(row, col) {
    if (isStart == true && isFinish == false) {
      this.state.startFinishIndexes.push(row);
      this.state.startFinishIndexes.push(col);

      const newGrid = getNewGrid(this.state.grid, row, col, "isStart");
      this.setState({ grid: newGrid });

      isStart = false;
      isFinish = true;
      this.state.message = "choose finish node";
    } else if (isStart == false && isFinish) {
      const node = this.state.grid[row][col];
      this.state.message =
        "put walls if you want to; u can also keep mouse clicked";

      if (!node.isStart) {
        this.state.startFinishIndexes.push(row);
        this.state.startFinishIndexes.push(col);
        const newGrid = getNewGrid(this.state.grid, row, col, "isFinish");
        this.setState({ grid: newGrid, buttonIsActive: "" });
        isFinish = false;
      }
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div>
        <div className="message">
          <code>{this.state.message}</code>
        </div>

        <div disabled={this.state.buttonIsActive} className="large blue button">
          get shortest path
        </div>

        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isVisited,
                    isWall,
                  } = node;
                  return (
                    <TNode
                      key={nodeIndex}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onClick={(row, col) => this.onClick(row, col)}
                      onMouseDown={(row, col) => this.onMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.onMouseEnter(row, col)}
                      onMouseUp={() => {
                        this.onMouseUp();
                      }}
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
    isWall: false,
  };
};

const getNewGrid = (grid, row, col, prop) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
  };

  newNode[prop] = true;
  newGrid[row][col] = newNode;
  return newGrid;
};
