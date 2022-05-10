import { useState } from "react";
import SelectInput from "./reusable/SelectInput";
import TextInput from "./reusable/TextInput";
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

// type Touched = {
//   name: boolean;
//   brand: boolean;
//   price: boolean;
//   releaseDate: boolean;
//   size: boolean;
// };

const untouchedForm = {
  name: false,
  brand: false,
  price: false,
  releaseDate: false,
  size: false,
};

type Status = "Idle" | "Submitting" | "Submitted";

export default function ManageShoes({ shoes, setShoes }: ManageShoesProps) {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoe, setShoe] = useState<Shoe>(newShoe);
  const [touched, setTouched] = useState(untouchedForm);
  const [status, setStatus] = useState<Status>("Idle");

  const { name, brand, price, releaseDate, size } = shoe;

  function onChange(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    // Copy the shoe object, then set the brand property
    setShoe({ ...shoe, [event.target.id]: event.target.value });
  }

  function validate() {
    const errors: Partial<Errors> = {};
    if ((touched.brand || status === "Submitted") && !shoe.brand)
      errors.brand = "Brand is required.";

    if ((touched.name || status === "Submitted") && !shoe.name)
      errors.name = "Name is required.";

    if ((touched.price || status === "Submitted") && !shoe.price)
      errors.price = "Price is required.";

    if ((touched.releaseDate || status === "Submitted") && !shoe.releaseDate)
      errors.releaseDate = "Release date is required.";

    if ((touched.size || status === "Submitted") && !shoe.size)
      errors.size = "Size is required.";

    return errors;
  }

  function onBlur(
    event:
      | React.FocusEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLInputElement>
  ) {
    setTouched({ ...touched, [event.target.id]: true });
  }

  // Derived state - Calculated on each render.
  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <h1>Manage Shoes</h1>

      <section>
        <h2>Add Shoe</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Hey browser, don't post back
            setStatus("Submitting");
            if (!isValid) {
              setStatus("Submitted");
              return;
            }
            setShoes([...shoes, shoe]);
            setShoe(newShoe);
          }}
        >
          <SelectInput
            id="brand"
            label="Brand"
            value={brand}
            onChange={onChange}
            onBlur={onBlur}
            options={[
              { value: "", label: "Select Brand" },
              { value: "Nike" },
              { value: "Adidas" },
              { value: "British Knights" },
            ]}
            error={errors.brand}
          />

          <TextInput
            id="name"
            label="Shoe name"
            value={name}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.name}
          />

          <TextInput
            id="price"
            label="Price"
            type="number"
            step=".01"
            error={errors.price}
            value={price}
            onChange={onChange}
            onBlur={onBlur}
          />

          <TextInput
            id="releaseDate"
            label="Release date"
            type="date"
            value={releaseDate}
            error={errors.releaseDate}
            onChange={onChange}
            onBlur={onBlur}
          />

          <TextInput
            id="size"
            label="Size"
            type="number"
            step=".5"
            value={size}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.size}
          />

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
