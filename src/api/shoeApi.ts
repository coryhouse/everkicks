import { NewShoe, Shoe } from "../types/types";

export async function getShoes(): Promise<Shoe[]> {
  const resp = await fetch("http://localhost:3001/shoes");
  if (!resp.ok) throw resp;
  const shoes = await resp.json();
  return shoes;
}

export async function addShoe(newShoe: NewShoe): Promise<Shoe> {
  const resp = await fetch("http://localhost:3001/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShoe),
  });

  if (!resp.ok) throw resp;
  const savedShoe = await resp.json();
  return savedShoe;
}

export async function deleteShoe(shoeId: number) {
  const resp = await fetch(`http://localhost:3001/shoes/${shoeId}`, {
    method: "DELETE",
  });
  if (!resp.ok) throw resp;
}

// Equivalent using promises
// export function getShoes2() {
//   return fetch("http://localhost:3001/shoes").then((resp) => {
//     if (!resp.ok) throw resp;
//     return resp.json().then((shoes) => shoes);
//   });
// }
