import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getShoes } from "./api/shoeApi";
import Home from "./Home";
import ManageShoes from "./ManageShoes";
import { Shoe } from "./types/types";

export default function App() {
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
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/shoes">Manage Shoes</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home shoes={shoes} />} />
          <Route
            path="/admin/shoes"
            element={<ManageShoes shoes={shoes} setShoes={setShoes} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
