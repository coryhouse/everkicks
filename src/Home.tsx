import ShoeList from "./ShoeList";
import { Shoe } from "./types/types";

type HomeProps = {
  shoes: Shoe[];
};

export default function Home({ shoes }: HomeProps) {
  return (
    <>
      <h1>Everkicks</h1>
      <ShoeList shoes={shoes} />
    </>
  );
}
