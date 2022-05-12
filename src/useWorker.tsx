import { setupWorker, SetupWorkerApi } from "msw";
import { useEffect, useState } from "react";
import { handlers } from "../src/mocks/handlers";

export function useWorker() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // This configures a Service Worker with the given request handlers.
    const worker = setupWorker(...handlers);

    const startWorker = async (worker: SetupWorkerApi) => {
      await worker.start();
      setIsReady(true);
    };

    startWorker(worker);

    // This is run on unmount
    return () => {
      worker.stop();
    };
  }, []);

  return isReady;
}
