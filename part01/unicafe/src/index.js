import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = (props) => <h1>{props.text}</h1>;

const average = (good, bad, all) => {
  let sumGood = good * 1;
  let sumBad = bad * -1;
  return (sumGood + sumBad) / all;
};

const percentage = (good, all) => {
  let sumDivided = 100 / all;
  return good * sumDivided;
};

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const all = good + neutral + bad;
  if (all === 0) {
    return <p>No feedbacks given.</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={"good: "} value={good} />
          <StatisticLine text={"neutral: "} value={neutral} />
          <StatisticLine text={"bad: "} value={bad} />
          <StatisticLine text={"all: "} value={all} />
          <StatisticLine text={"average: "} value={average(good, bad, all)} />
          <StatisticLine text={"positive: "} value={percentage(good, all)} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={"give feedback"} />
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
