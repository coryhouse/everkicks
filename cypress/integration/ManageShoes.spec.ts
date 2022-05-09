describe("ManageShoes", () => {
  it("should support adding a shoe and displaying the shoe on the homepage", () => {
    cy.visit("http://localhost:3000/admin/shoes");
  });
});
