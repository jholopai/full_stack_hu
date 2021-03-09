import ReactDOM from "react-dom";
import axios from "axios";
import CountryTag from "./components/CountryTag";
import CountryFullView from "./components/CountryFullView";
import React, { useState, useEffect } from "react";

const filterItems = (array, value) => {
  let newArray = array.filter((data) => {
    return data.name.toLowerCase().includes(value.toLowerCase());
  });
  return newArray;
};

const getData = (countries, setCountries) => {
  axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
    setCountries(response);
  });
  return countries;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  if (countries === undefined || countries.length == 0)
    getData(countries, setCountries);
  const handleInputChange = (event) => {
    setSelectedCountry("");
    const filtered = filterItems(countries.data, event.target.value);
    setFilteredCountries(filtered);
  };
  return (
    <div>
      find countries <input onChange={handleInputChange}></input>
      {selectedCountry.length != 0 && (
        <CountryFullView country={selectedCountry} />
      )}
      {selectedCountry.length == 0 && filteredCountries.length > 9 && (
        <p>Too many matches, specify another filter.</p>
      )}
      {selectedCountry.length == 0 &&
        filteredCountries.length < 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <p>
            <CountryTag key={country.id} name={country.name} />
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </p>
        ))}
      {filteredCountries.length === 1 && (
        <CountryFullView country={filteredCountries[0]} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
