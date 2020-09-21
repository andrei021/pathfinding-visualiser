import React, { Component } from "react";
import "./TNode.css";

export default class TNode extends Component {
  render() {
      const {
          row,
          col,
          isSart,
          isFinish,
          isVisited
      } = this.props;

      const extraClassName = 
      isSart ? "TNode-start" :
      isFinish ? "TNode-finish" :
      "";

    return (
      <div className="TNode">
        
      </div>
    );
  }
}
