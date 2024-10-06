import React from "react";

function UnitToggle({ isCelsius, setIsCelsius }) {
  return (
    <div className="unit-toggle">
      <button className="btn" onClick={() => setIsCelsius(!isCelsius)}>
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
    </div>
  );
}

export default UnitToggle;