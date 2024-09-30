import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName);
    }
    setCityName("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;