function incrementByOne(total, part) {
  return total + part.exercises;
}

const Total = (props) => {
  const exercises = props.course.parts.reduce(incrementByOne, 0);

  return <p style={{ fontWeight: "bold" }}>Number of exercises {exercises}</p>;
};

export default Total;
