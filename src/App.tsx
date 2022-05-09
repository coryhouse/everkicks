import { useState } from "react";

export default function App() {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);
  const [shoe, setShoe] = useState("");

  // Exercise 1: Render "Add shoe" button above the list of shoes.
  return (
    <>
      <h1>Everkicks</h1>
      <form
        onSubmit={() => {
          //setShoes([...shoes, ????])
        }}
      >
        <label htmlFor="shoe-name">Shoe name</label>
        <br />
        <input
          type="text"
          id="shoe-name"
          value={shoe}
          onChange={(event) => setShoe(event.target.value)}
        />
        <button>Add Shoe</button>
      </form>
      <ul>
        {shoes.map((shoe) => (
          <li>{shoe}</li>
        ))}
      </ul>
    </>
  );
}
