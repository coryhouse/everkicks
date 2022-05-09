import { useState } from "react";

export default function ManageShoes() {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);
  const [shoe, setShoe] = useState("");

  return (
    <>
      <h1>Everkicks</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault(); // Hey browser, don't post back
          setShoes([...shoes, shoe]);
          setShoe("");
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
        <button type="submit">Add Shoe</button>
      </form>

      <ul>
        {shoes.map((shoe) => (
          <li>{shoe}</li>
        ))}
      </ul>
    </>
  );
}
