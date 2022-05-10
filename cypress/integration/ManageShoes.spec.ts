/// <reference types="cypress" />

describe("ManageShoes", () => {
  it("should support adding a shoe and displaying the shoe on the homepage", () => {
    cy.visit("http://localhost:3000/admin/shoes");
    cy.findByLabelText("Shoe name").type("British Knights");
    cy.findByRole("button", { name: "Add Shoe" }).click();
    cy.findByText("British Knights");

    //Now the input should be empty because we just submitted the form
    cy.findByLabelText("Shoe name").should("be.empty");
    cy.findByRole("navigation").findByRole("link", { name: "Home" }).click();

    // We've moved to a new page, so assure we're on the new URL
    cy.url().should("eq", "http://localhost:3000/");

    cy.findByText("British Knights");
  });
});
