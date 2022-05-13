import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import DevTools, { GetShoesResponse } from "./DevTools";
import { useLocalStorage } from "./useLocalStorage";
import { useWorker } from "./useWorker";

export type DevToolsConfig = {
  getShoesResponse: GetShoesResponse;
};

const defaultDevToolsConfig: DevToolsConfig = {
  getShoesResponse: "success",
};

export function AppDevTools() {
  const [config, setConfig] = useLocalStorage(
    "devtools",
    defaultDevToolsConfig
  );

  const isReady = useWorker(config);

  return isReady ? (
    <>
      <ErrorBoundary
        // Throw away the old app and re-render the App and all children
        // anytime the dev tools config changes.
        key={JSON.stringify(config)}
        fallback={<>App crashed. :(</>}
      >
        <App />
      </ErrorBoundary>
      <DevTools config={config} setConfig={setConfig} />
    </>
  ) : null;
}
