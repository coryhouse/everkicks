import { rest, setupWorker, SetupWorkerApi } from "msw";
import { useEffect, useState } from "react";
import { GetShoesResponse } from "./DevTools";

type UseWorkerConfig = {
  getShoesResponse: GetShoesResponse;
};

export function useWorker(config: UseWorkerConfig) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handlers = [
      rest.get("http://localhost:3001/shoes", (req, res, ctx) => {
        if (config.getShoesResponse === "success") {
          return res(
            ctx.status(200),
            ctx.json([
              {
                brand: "Nike",
                name: "Mock One",
                price: "95",
                releaseDate: "1998-01-01",
                size: "07",
                id: 1,
              },
            ])
          );
        } else {
          return res(ctx.status(500));
        }
      }),
      //rest.delete("/shoes",
    ];

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
  }, [config.getShoesResponse]);

  return isReady;
}
