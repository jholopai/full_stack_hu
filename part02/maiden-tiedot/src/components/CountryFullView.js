const CountryFullView = (props) => (
  <div>
    <h1>{props.country.name}</h1>
    <p>capitol: {props.country.capital}</p>
    <p>population: {props.country.population}</p>
    <h2>Languages</h2>
    <ul>
      {props.country.languages
        .map((language) => {
          return <li> + language + </li>;
        })
        .join("")}
    </ul>
  </div>
);

export default CountryFullView;
