import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getShoes } from "./api/shoeApi";
import ErrorFallback from "./ErrorFallback";
import Spinner from "./Spinner";
import { Shoe } from "./types/types";
import { useUserContext } from "./UserContext";

const Home = lazy(() => import("./Home"));
const ManageShoes = lazy(() => import("./ManageShoes"));

export default function App() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    async function fetch() {
      try {
        const shoesResp = await getShoes();
        setShoes(shoesResp);
        setIsLoading(false);
      } catch (e) {
        setError(e as Error);
      }
    }
    fetch();
    // Dependency array specifies when this should re-run.
    // Since it should only run once, we declare an empty array.
  }, []);

  if (error) throw error;

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
            <Route
              path="/"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Home shoes={shoes} />
                </ErrorBoundary>
              }
            />

            <Route
              path="/admin/shoes"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ManageShoes
                    isLoading={isLoading}
                    shoes={shoes}
                    setShoes={setShoes}
                  />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
