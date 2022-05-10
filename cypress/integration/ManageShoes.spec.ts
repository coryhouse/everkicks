/// <reference types="cypress" />

describe("ManageShoes", () => {
  it("should support adding a shoe and displaying the shoe on the homepage", () => {
    cy.visit("http://localhost:3000/admin/shoes");

    // First, check validation by submitting an empty form
    cy.findByRole("button", { name: "Add Shoe" }).click();

    // Check for error messages
    cy.findByText("Brand is required.");
    cy.findByText("Name is required.");
    cy.findByText("Price is required.");
    cy.findByText("Release date is required.");
    cy.findByText("Size is required.");

    // Fill form
    cy.findByLabelText("Brand").select("British Knights");
    cy.findByLabelText("Shoe name").type("BK1");
    cy.findByLabelText("Price").type("49.95");
    cy.findByLabelText("Release date").type("1989-11-29");
    cy.findByLabelText("Size").type("5");
    cy.findByRole("button", { name: "Add Shoe" }).click();

    cy.findByRole("heading", { name: "Shoes" })
      .closest("section")
      .findByText("British Knights BK1");

    //Now the form should be reset because we just submitted the form
    cy.findByLabelText("Shoe name").should("be.empty");
    cy.findAllByLabelText("Brand").should("have.value", "");
    cy.findByLabelText("Price").should("be.empty");
    cy.findByLabelText("Release date").should("be.empty");
    cy.findByLabelText("Size").should("be.empty");

    cy.findByRole("navigation").findByRole("link", { name: "Home" }).click();

    // We've moved to a new page, so assure we're on the new URL
    cy.url().should("eq", "http://localhost:3000/");

    cy.findByText(/British Knights/);
  });
});
