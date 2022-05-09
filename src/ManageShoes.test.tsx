import React from "react";
import { render, screen } from "@testing-library/react";
import ManageShoes from "./ManageShoes";

it("renders heading", () => {
  render(<ManageShoes shoes={[]} setShoes={() => {}} />);
  screen.getByRole("heading", { name: "Everkicks: Manage Shoes" });
});
