type HomeProps = {
  shoes: string[];
};

export default function Home({ shoes }: HomeProps) {
  return (
    <>
      <h1>Everkicks</h1>

      <ul>
        {shoes.map((shoe) => (
          <li>{shoe}</li>
        ))}
      </ul>
    </>
  );
}
