import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { getShoes } from "./api/shoeApi";
import ErrorFallback from "./ErrorFallback";
import ExpensiveTree from "./ExpensiveTree";
import FastForm from "./FastForm";
import Spinner from "./Spinner";
import { useUserContext } from "./UserContext";

const Home = lazy(() => import("./Home"));
const ManageShoes = lazy(() => import("./ManageShoes"));

export default function App() {
  const { user } = useUserContext();
  const { error, data: shoes, isLoading } = useQuery("shoes", getShoes);

  if (error) throw error;
  if (!shoes) return <Spinner />;

  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/fast-form">Fast form</Link>
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/fast-form"
                element={<FastForm slowComponent={<ExpensiveTree />} />}
              />

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
                      setShoes={() => {}}
                    />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        )}
      </main>
    </BrowserRouter>
  );
}
