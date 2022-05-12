import { setupWorker } from "msw";
import { useEffect } from "react";
import { handlers } from "../src/mocks/handlers";

export function useWorker() {
  useEffect(() => {
    // This configures a Service Worker with the given request handlers.
    const worker = setupWorker(...handlers);

    worker.start();

    // This is run on unmount
    return () => {
      worker.stop();
    };
  }, []);
}
