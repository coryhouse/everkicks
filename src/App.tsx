import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ManageShoes from "./ManageShoes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/shoes" element={<ManageShoes />} />
      </Routes>
    </BrowserRouter>
  );
}
