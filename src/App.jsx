import { useState } from "react";
import "./App.css";
import { solveWaterJug } from "./utils/math/algorithm";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [solution, setSolution] = useState(null);

  const handleSolve = () => {
    console.log(`x, y, z`, x, y, z);
    const result = solveWaterJug(x, y, z);
  
    if (result === "No Solution") {
      setSolution("No Solution");
      return;
    }

    setSolution(result);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value === "" ? 0 : parseInt(value));
    }
  };

  const preventDelete = (e) => {
    if (e.key === "Backspace" && e.target.value.length === 0) {
      e.preventDefault();
    }
  };

  const handleClear = () => {
    setX(0);
    setY(0);
    setZ(0);
    setSolution(null);
  }


  return (
    <div className="container">
      <div className="row title">
        <h1>Watter Jug Challenge</h1>
      </div>
      <div className="row boxes">
        <div className="box">
          <div className="water"></div>
        </div>
        <div className="box">
          <div className="water"></div>
        </div>
      </div>
      <div className="row buttons">
        <button className="btn" onClick={() => handleSolve()}>
          Solve
        </button>
        <button className="btn" onClick={() => handleClear()}>
          Clear
        </button>
      </div>
      <div className="row buttons input-capacities">
        <div className="input-container">
          <label>X Capacity</label>
          <input
            type="text"
            value={x}
            onChange={handleInputChange(setX)}
            onKeyDown={preventDelete}
            placeholder="Jug X Capacity"
          />
        </div>
        <div className="input-container">
          <label>Gallons to measure</label>

          <input
            type="text"
            value={z}
            onChange={handleInputChange(setZ)}
            onKeyDown={preventDelete}
            placeholder="Target Z"
          />
        </div>
        <div className="input-container">
          <label>Y Capacity</label>
          <input
            type="text"
            value={y}
            onChange={handleInputChange(setY)}
            onKeyDown={preventDelete}
            placeholder="Jug Y Capacity"
          />
        </div>
      </div>
      <div className="row solution">
        {solution === "No Solution" ? (
          <p>No Solution</p>
        ) : (
          solution &&
          solution.map((step, index) => (
            <div key={index}>
              <p>
                Step {index + 1}: Jug X = {step.x}, Jug Y = {step.y}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
