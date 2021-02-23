const CountryFullView = (props) => (
  <div>
    <h1>{props.country.name}</h1>
    <p>capitol: {props.country.capital}</p>
    <p>population: {props.country.population}</p>
    <h2>Languages</h2>
    <ul>
      {props.country.languages.map((language) => (
        <li key={language.iso639_2}>{language.name}</li>
      ))}
    </ul>
    <img
      src={props.country.flag}
      alt="flag"
      width="200"
      height="121"
      border="1"
    ></img>
  </div>
);

export default CountryFullView;
