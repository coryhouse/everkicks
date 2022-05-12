/// <reference types="cypress" />
import { NewShoe } from "../../src/types/types";

function deleteShoe(brandAndName: string) {
  cy.findByRole("button", { name: `Delete ${brandAndName}` }).click();

  cy.get(".Toastify")
    //.findAllByRole("alert")
    .findByText(`${brandAndName} deleted.`);
}

function addShoe(shoe: NewShoe) {
  cy.findByLabelText("Brand").select(shoe.brand);
  cy.findByLabelText("Shoe name").type(shoe.name);
  cy.findByLabelText("Price").clear().type(shoe.price.toString());
  cy.findByLabelText("Release date").type(shoe.releaseDate);
  cy.findByLabelText("Size").type(shoe.size.toString());
  cy.findByRole("button", { name: "Add Shoe" }).click();
}

describe("ManageShoes", () => {
  it("should support adding a shoe, displaying it on the homepage, and deleting it", () => {
    cy.visit("http://localhost:3000/admin/shoes");

    // Assure existing shoes display
    cy.findByRole("heading", { name: "Nike Air Force One" });

    // First, check validation by submitting an empty form
    cy.findByRole("button", { name: "Add Shoe" }).click();

    // Check for error messages
    cy.findByRole("alert", { name: "Brand is required." });
    cy.findByRole("alert", { name: "Name is required." });
    cy.findByRole("alert", { name: "Price is required." });
    cy.findByRole("alert", { name: "Release date is required." });
    cy.findByRole("alert", { name: "Size is required." });

    // Fill form
    addShoe({
      brand: "British Knights",
      name: "BK1",
      price: 49.95,
      releaseDate: "1989-11-29",
      size: 5,
    });

    cy.findByRole("heading", { name: "Shoes" })
      .closest("section")
      .findByText("British Knights BK1");

    //Now the form should be reset because we just submitted the form
    cy.findByLabelText("Shoe name").should("be.empty");
    cy.findAllByLabelText("Brand").should("have.value", "");
    cy.findByLabelText("Price").should("be.empty");
    cy.findByLabelText("Release date").should("be.empty");
    cy.findByLabelText("Size").should("be.empty");

    // Nav to Home
    cy.findByRole("navigation").findByRole("link", { name: "Home" }).click();

    // Delete buttons should NOT show
    cy.findByRole("button", { name: "Delete British Knights BK1" }).should(
      "not.exist"
    );

    // We've moved to a new page, so assure we're on the new URL
    cy.url().should("eq", "http://localhost:3000/");

    cy.findByText(/British Knights/);

    // Now, let's test delete, so go to the manage page
    cy.findByRole("navigation")
      .findByRole("link", { name: "Manage Shoes" })
      .click();

    // Delete all shoes to confirm that the "No shoes" message displays
    deleteShoe("British Knights BK1");
    deleteShoe("Nike Air Force One");

    cy.findByText("No shoes :(");

    // Finally, add the initial shoe back that we deleted
    addShoe({
      brand: "Nike",
      name: "Air Force One",
      price: 95.0,
      releaseDate: "1998-01-01",
      size: 7,
    });
  });
});
