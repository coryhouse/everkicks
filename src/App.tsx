import { useState } from "react";

export default function App() {
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);

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
