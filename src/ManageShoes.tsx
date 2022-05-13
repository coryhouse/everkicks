import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { addShoe, deleteShoe } from "./api/shoeApi";
import ExpensiveTree from "./ExpensiveTree";
import LoadingContainer from "./LoadingContainer";
import SelectInput from "./reusable/SelectInput";
import TextInput from "./reusable/TextInput";
import ShoeList from "./ShoeList";
import { NewShoe, Shoe } from "./types/types";

interface ManageShoesProps {
  shoes: Shoe[];
  setShoes: (shoes: Shoe[]) => void;
  isLoading: boolean;
}

// Declaring outside the component so that it is only allocated once
// Note: default values only apply once, but are parsed on every render.
const newShoe: NewShoe = {
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

export default function ManageShoes({
  shoes,
  setShoes,
  isLoading,
}: ManageShoesProps) {
  // Declare stuff in state that changes over time.
  // That way React knows to re-render when the state changes
  const [shoe, setShoe] = useState<NewShoe>(newShoe);
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

  function validateForm(status: Status) {
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Hey browser, don't post back
    setStatus("Submitted");
    const validationErrors = validateForm("Submitted");
    const isValid = Object.keys(validationErrors).length === 0;
    if (!isValid) {
      return;
    }
    const savedShoe = await addShoe(shoe);
    setShoes([...shoes, savedShoe]);
    setShoe(newShoe);
  }

  async function onDelete(shoe: Shoe) {
    await deleteShoe(shoe.id);
    toast.success(`${shoe.brand} ${shoe.name} deleted.`);
    setShoes(shoes.filter((s) => s.id !== shoe.id));
  }

  // Derived state - Calculated on each render.
  const errors = validateForm(status);

  return (
    <>
      <h1>Manage Shoes</h1>

      <LoadingContainer isLoading={isLoading}>
        <section>
          <h2>Add Shoe</h2>
          <form onSubmit={onSubmit}>
            <ExpensiveTree />
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
          <ShoeList shoes={shoes} onDeleteClick={onDelete} />
        </section>
      </LoadingContainer>
    </>
  );
}
