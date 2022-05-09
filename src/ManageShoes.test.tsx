import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ManageShoes from "./ManageShoes";

it("renders heading", () => {
  render(<ManageShoes shoes={[]} setShoes={() => {}} />);
  screen.getByRole("heading", { name: "Everkicks: Manage Shoes" });
});

it("supports adding a shoe", () => {
  render(<ManageShoes shoes={[]} setShoes={() => {}} />);
  const input: HTMLInputElement = screen.getByLabelText("Shoe name");
  const submitButton = screen.getByRole("button", { name: "Add Shoe" });
  fireEvent.change(input, { target: { value: "British Knights" } });
  fireEvent.click(submitButton);

  // Now the input should be empty because we just submitted the form
  expect(input.value).toEqual("");

  // Exercise: Make this test pass.
  screen.getByText("British Knights");
});
