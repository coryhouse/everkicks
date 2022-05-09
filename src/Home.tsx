export default function Home() {
  const shoes: Array<string> = [];
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
