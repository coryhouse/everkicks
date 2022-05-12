import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getShoes } from "./api/shoeApi";
import DevTools, { User } from "./DevTools";
import Home from "./Home";
import ManageShoes from "./ManageShoes";
import { Shoe } from "./types/types";

export default function App() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>("customer");

  useEffect(() => {
    async function fetch() {
      const shoesResp = await getShoes();
      setShoes(shoesResp);
      setIsLoading(false);
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
            {user === "admin" && (
              <li>
                <Link to="/admin/shoes">Manage Shoes</Link>
              </li>
            )}
          </ul>
        </nav>
        <p>Hi {user}</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home shoes={shoes} />} />
          <Route
            path="/admin/shoes"
            element={
              <ManageShoes
                isLoading={isLoading}
                shoes={shoes}
                setShoes={setShoes}
              />
            }
          />
        </Routes>
      </main>
      <DevTools user={user} setUser={setUser} />
    </BrowserRouter>
  );
}
