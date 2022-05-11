import ShoeList from "./ShoeList";
import Spinner from "./Spinner";
import { Shoe } from "./types/types";

type HomeProps = {
  shoes: Shoe[];
};

export default function Home({ shoes }: HomeProps) {
  return (
    <>
      <h1>Everkicks</h1>
      {shoes.length === 0 ? <Spinner /> : <ShoeList shoes={shoes} />}
    </>
  );
}
