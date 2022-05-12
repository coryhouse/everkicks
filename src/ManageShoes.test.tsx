import React from "react";
import { render, screen } from "@testing-library/react";
import ManageShoes from "./ManageShoes";

it("renders the h1 heading and spinner when isLoading is true", () => {
  render(<ManageShoes isLoading shoes={[]} setShoes={() => {}} />);
  screen.getByRole("heading", { name: "Manage Shoes" });
  screen.getByLabelText("Loading...");
});

it("renders the h2 and list and hiding the spinner when isLoading is false", () => {
  render(
    <ManageShoes
      isLoading={false}
      shoes={[
        {
          brand: "Brand",
          id: 1,
          name: "Name",
          price: 0,
          releaseDate: "2020-01-01",
          size: 7,
        },
      ]}
      setShoes={() => {}}
    />
  );
  screen.getByRole("heading", { name: "Manage Shoes" });
  screen.getByRole("heading", { name: "Brand Name" });
  expect(screen.queryByLabelText("Loading...")).not.toBeInTheDocument();
});
