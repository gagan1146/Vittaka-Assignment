import React, { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/Card/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const API_URL = "https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(err => console.error("Failed to fetch countries", err));
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="menu">
          <li>Product</li>
          <li>Features</li>
          <li>Marketplace</li>
          <li>Company</li>
        </ul>
        <button className="login-btn">Log in →</button>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="results">
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))
          ) : (
            <p className="no-results">No country found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
