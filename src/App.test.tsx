import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

it("renders heading", () => {
  render(<App />);
  screen.getByRole("heading", { name: "Everkicks" });
});

it("supports adding a shoe", () => {
  render(<App />);
  const input = screen.getByLabelText("Shoe name");
  const submitButton = screen.getByRole("button", { name: "Add Shoe" });
  fireEvent.change(input, { target: { value: "British Knights" } });
  fireEvent.click(submitButton);
  screen.getByText("British Knights");
});
