import { useState } from "react";
import { Shoe } from "./types/types";

interface ManageShoesProps {
  shoes: Shoe[];
  setShoes: (shoes: Shoe[]) => void;
}

// Declaring outside the component so that it is only allocated once
// Note: default values only apply once, but are parsed on every render.
const newShoe: Shoe = { name: "", brand: "" };

export default function ManageShoes({ shoes, setShoes }: ManageShoesProps) {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoe, setShoe] = useState<Shoe>(newShoe);

  const { name, brand } = shoe;

  function onChange(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    // Copy the shoe object, then set the brand property
    setShoe({ ...shoe, [event.target.id]: event.target.value });
  }

  return (
    <>
      <h1>Manage Shoes</h1>

      <section>
        <h2>Add Shoe</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Hey browser, don't post back
            setShoes([...shoes, shoe]);
            setShoe(newShoe);
          }}
        >
          <div>
            <label htmlFor="brand">Brand</label>
            <br />
            <select id="brand" value={brand} onChange={onChange}>
              <option value="">Select brand</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="British Knights">British Knights</option>
            </select>
          </div>

          <div>
            <label htmlFor="name">Shoe name</label>
            <br />
            <input type="text" id="name" value={name} onChange={onChange} />
          </div>
          <button type="submit">Add Shoe</button>
        </form>
      </section>

      <section>
        <h2>Shoes</h2>
        <ul>
          {shoes.map((shoe) => (
            <li>
              {shoe.brand} {shoe.name}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
