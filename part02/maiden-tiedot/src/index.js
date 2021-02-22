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
  console.log("haettu");
  return countries;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const handleInputChange = (event) => {
    const filtered = filterItems(countries.data, event.target.value);
    setFilteredCountries(filtered);
  };
  const showCountries = () => {
    var i = 0;
    console.log(filteredCountries);
    if (filteredCountries.length == 1)
      return <CountryFullView country={filteredCountries[0]} />;
    if (filteredCountries.length < 10) {
      return filteredCountries.map((country) => (
        <CountryTag key={country.id} name={country.name} />
      ));
    }
    if (filteredCountries.length > 9)
      return <p>Too many matches, specify another filter.</p>;
  };
  if (countries === undefined || countries.length == 0)
    getData(countries, setCountries);
  return (
    <div>
      find countries <input onChange={handleInputChange}></input>
      {showCountries()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
