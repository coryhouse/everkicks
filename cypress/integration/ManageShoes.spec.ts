/// <reference types="cypress" />

describe("ManageShoes", () => {
  it("should support adding a shoe and displaying the shoe on the homepage", () => {
    cy.visit("http://localhost:3000/admin/shoes");
    cy.findByLabelText("Brand").select("British Knights");
    cy.findByLabelText("Shoe name").type("BK1");
    cy.findByRole("button", { name: "Add Shoe" }).click();

    cy.findByRole("heading", { name: "Shoes" })
      .closest("section")
      .findByText("British Knights BK1");

    //Now the form should be reset because we just submitted the form
    cy.findByLabelText("Shoe name").should("be.empty");
    cy.findAllByLabelText("Brand").should("have.value", "");

    cy.findByRole("navigation").findByRole("link", { name: "Home" }).click();

    // We've moved to a new page, so assure we're on the new URL
    cy.url().should("eq", "http://localhost:3000/");

    cy.findByText("British Knights BK1");
  });
});
