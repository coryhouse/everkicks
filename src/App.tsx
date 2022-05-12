import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getShoes } from "./api/shoeApi";
import DevTools, { User } from "./DevTools";
import Spinner from "./Spinner";
import { Shoe } from "./types/types";

const Home = lazy(() => import("./Home"));
const ManageShoes = lazy(() => import("./ManageShoes"));

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
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </main>
      <DevTools user={user} setUser={setUser} />
    </BrowserRouter>
  );
}
