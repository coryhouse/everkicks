export async function getShoes() {
  const resp = await fetch("http://localhost:3001/shoes");
  if (!resp.ok) throw resp;
  const shoes = await resp.json();
  return shoes;
}

// Equivalent using promises
// export function getShoes2() {
//   return fetch("http://localhost:3001/shoes").then((resp) => {
//     if (!resp.ok) throw resp;
//     return resp.json().then((shoes) => shoes);
//   });
// }
