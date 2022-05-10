import { Shoe } from "./types/types";

type HomeProps = {
  shoes: Shoe[];
};

export default function Home({ shoes }: HomeProps) {
  return (
    <>
      <h1>Everkicks</h1>

      <ul>
        {shoes.map((shoe) => (
          <li>{shoe.name}</li>
        ))}
      </ul>
    </>
  );
}
