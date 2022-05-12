import App from "./App";
import DevTools from "./DevTools";
import { useWorker } from "./useWorker";

export function AppDevTools() {
  // TODO: Pass our devtools config to useWorker
  const isReady = useWorker();

  return isReady ? (
    <>
      <App />
      <DevTools />
    </>
  ) : null;
}
