import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ManageShoes from "./ManageShoes";

export default function App() {
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);

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
