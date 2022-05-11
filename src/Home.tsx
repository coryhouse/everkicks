import { useEffect, useState } from "react";
import { getShoes } from "./api/shoeApi";
import ShoeList from "./ShoeList";
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
      <ShoeList shoes={shoes} />
    </>
  );
}
