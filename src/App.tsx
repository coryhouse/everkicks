import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ManageShoes from "./ManageShoes";

export default function App() {
  const [shoes, setShoes] = useState(["Nike Air Max", "Reebok Pump"]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home shoes={shoes} />} />
        <Route
          path="/admin/shoes"
          element={<ManageShoes shoes={shoes} setShoes={setShoes} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
