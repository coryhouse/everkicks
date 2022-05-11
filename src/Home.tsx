import { useEffect, useState } from "react";
import { getShoes } from "./api/shoeApi";
import { Shoe } from "./types/types";

export default function Home() {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    async function fetch() {
      const shoes = await getShoes();
    }
    fetch();
  });

  return (
    <>
      <h1>Everkicks</h1>

      <ul>
        {shoes.map((shoe) => (
          <li>{JSON.stringify(shoe)}</li>
        ))}
      </ul>
    </>
  );
}
