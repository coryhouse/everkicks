import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001/shoes", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          brand: "Nike",
          name: "Mock One",
          price: "95",
          releaseDate: "1998-01-01",
          size: "07",
          id: 1,
        },
      ])
    );
  }),
  //rest.delete("/shoes",
];
