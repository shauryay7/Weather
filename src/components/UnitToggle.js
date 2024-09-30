import React from "react";

function UnitToggle({ isCelsius, setIsCelsius }) {
  return (
    <div className="unit-toggle">
      <button onClick={() => setIsCelsius(!isCelsius)}>
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
    </div>
  );
}

export default UnitToggle;