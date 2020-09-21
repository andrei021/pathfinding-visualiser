import React from "react";
import PathfindingVisualizer from "./Components/PathfindingVisualizer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <code style={{ marginTop: "30px" }}>Pathfinding Visualiser</code>
        {/* <code style={{marginTop: '20px'}}>da</code> */}
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    </div>
  );
}
export default App;
