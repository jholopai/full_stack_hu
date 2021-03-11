const Form = (props) => (
  <form onSubmit={props.handleFormSubmit}>
    <div className="row">
      <div className="column" style={{ display: "inline-block" }}>
        name:
      </div>
      <div className="column" style={{ display: "inline-block" }}>
        <input value={props.newName} onChange={props.handleNameChange} />
      </div>
    </div>
    <div className="row">
      <div className="column" style={{ display: "inline-block" }}>
        number:
      </div>
      <div className="column" style={{ display: "inline-block" }}>
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
    </div>
    <button type="submit">add</button>
  </form>
);

export default Form;
