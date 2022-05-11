import { useEffect, useState } from "react";
import { getShoes } from "./api/shoeApi";
import { Shoe } from "./types/types";

export default function Home() {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    async function fetch() {
      const shoesResp = await getShoes();
      setShoes(shoesResp);
    }
    fetch();
    // Dependency array specifies when this should re-run.
    // Since it should only run once, we declare an empty array.
  }, []);

  return (
    <>
      <h1>Everkicks</h1>

      <ul style={{ listStyleType: "none", display: "flex", padding: 0 }}>
        {shoes.map((shoe) => (
          <li>
            <article style={{ border: "solid 1px gray", padding: 16 }}>
              <h2>
                {shoe.brand} {shoe.name}
              </h2>
              <p>Size: {shoe.size}</p>
              <p>
                Released{" "}
                <time dateTime={shoe.releaseDate}>{shoe.releaseDate}</time>
              </p>
              <p style={{ fontWeight: "bold", color: "green" }}>
                ${shoe.price}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
