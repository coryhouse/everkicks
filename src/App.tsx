import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ManageShoes from "./ManageShoes";

// Exercise 3: Implement nav bar with links to both pages.
export default function App() {
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);

  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/admin/shoes">Manage Shoes</a>
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
