import React from "react";

function CountryCard({ country }) {
  const {
    name,
    capital,
    region,
    population,
    flag,
    callingCodes,
  } = country;

  return (
    <div className="country-card">
      <div className="country-info">
        <img
          src={flag}
          alt={name}
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="details">
          <h3>{name || "Unknown Country"}</h3>
          <p><strong>Capital:</strong> {capital || "N/A"}</p>
          <p><strong>Region:</strong> {region || "N/A"}</p>
          <p><strong>Population:</strong> {population?.toLocaleString() || "N/A"}</p>
          <p><strong>Calling Code:</strong> {callingCodes?.[0] ? `+${callingCodes[0]}` : "N/A"}</p>
        </div>
      </div>
      <button className="view-btn">View Profile</button>
    </div>
  );
}

export default CountryCard;