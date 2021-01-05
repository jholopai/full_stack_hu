import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const randomNumber = () => {
  const number = Math.floor(Math.random() * 5 + 0);
  return number;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const updateArray = () =>
    setPoints(() => {
      const copy = [...points];
      copy[selected] = points[selected] + 1;
      return copy;
    });
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <p>
        <Button handleClick={updateArray} text="vote" />
        <Button
          handleClick={() => setSelected(randomNumber())}
          text="next anecdote"
        />
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {points[points.indexOf(Math.max(...points))]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
