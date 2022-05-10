import { useState } from "react";
import { Shoe } from "./types/types";

interface ManageShoesProps {
  shoes: Shoe[];
  setShoes: (shoes: Shoe[]) => void;
}

// Declaring outside the component so that it is only allocated once
// Note: default values only apply once, but are parsed on every render.
const newShoe: Shoe = {
  name: "",
  brand: "",
  price: 0,
  releaseDate: "",
  size: 0,
};

type Errors = {
  name: string;
  brand: string;
  price: string;
  releaseDate: string;
  size: string;
};

export default function ManageShoes({ shoes, setShoes }: ManageShoesProps) {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoe, setShoe] = useState<Shoe>(newShoe);
  const [errors, setErrors] = useState<Partial<Errors>>({});

  const { name, brand, price, releaseDate, size } = shoe;

  function onChange(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    // Copy the shoe object, then set the brand property
    setShoe({ ...shoe, [event.target.id]: event.target.value });
  }

  function formIsValid() {
    const currentErrors: Partial<Errors> = {};
    if (!shoe.brand) currentErrors.brand = "Brand is required.";
    if (!shoe.name) currentErrors.name = "Name is required.";
    if (!shoe.price) currentErrors.price = "Price is required.";
    if (!shoe.releaseDate)
      currentErrors.releaseDate = "Release date is required.";
    if (!shoe.size) currentErrors.size = "Size is required.";
    setErrors(currentErrors);
    // Return true if the errors object has no properties.
    return Object.keys(currentErrors).length === 0;
  }

  return (
    <>
      <h1>Manage Shoes</h1>

      <section>
        <h2>Add Shoe</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Hey browser, don't post back
            if (!formIsValid()) return;
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
          {errors.brand && <div>{errors.brand}</div>}

          <div>
            <label htmlFor="name">Shoe name</label>
            <br />
            <input type="text" id="name" value={name} onChange={onChange} />
          </div>
          {errors.name && <div>{errors.name}</div>}

          <div>
            <label htmlFor="price">Price</label>
            <br />
            <input
              type="number"
              step=".01"
              id="price"
              value={price}
              onChange={onChange}
            />
          </div>
          {errors.price && <div>{errors.price}</div>}

          <div>
            <label htmlFor="releaseDate">Release date</label>
            <br />
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={onChange}
            />
          </div>
          {errors.releaseDate && <div>{errors.releaseDate}</div>}

          <div>
            <label htmlFor="size">Size</label>
            <br />
            <input
              type="number"
              step=".5"
              id="size"
              value={size}
              onChange={onChange}
            />
          </div>
          {errors.size && <div>{errors.size}</div>}

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
