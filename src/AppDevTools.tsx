import { useState } from "react";
import App from "./App";
import DevTools, { GetShoesResponse } from "./DevTools";
import { useWorker } from "./useWorker";

export function AppDevTools() {
  const [getShoesResponse, setGetShoesResponse] =
    useState<GetShoesResponse>("500");

  const isReady = useWorker({
    getShoesResponse,
  });

  return isReady ? (
    <>
      <App />
      <DevTools
        getShoesResponse={getShoesResponse}
        setGetShoesResponse={setGetShoesResponse}
      />
    </>
  ) : null;
}
