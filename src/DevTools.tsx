import { useState } from "react";
import SelectInput from "./reusable/SelectInput";
import "./DevTools.css";
import { User } from "./types/types";
import { useUserContext } from "./UserContext";
import { DevToolsConfig } from "./AppDevTools";

export type GetShoesResponse = "success" | "500";

type DevToolsProps = {
  config: DevToolsConfig;
  setConfig: (config: DevToolsConfig) => void;
};

export default function DevTools({ config, setConfig }: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { setUser, user } = useUserContext();

  return (
    <div className="devtools">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <>
          <SelectInput
            id="user"
            label="User"
            onChange={(e) => setUser(e.target.value as User)}
            value={user}
            options={[
              { label: "Customer", value: "customer" },
              { label: "Admin", value: "admin" },
            ]}
          />

          <SelectInput
            id="get-shoes"
            label="Get Shoes Response"
            onChange={(e) => {
              setConfig({
                ...config,
                getShoesResponse: e.target.value as GetShoesResponse,
              });
            }}
            value={config.getShoesResponse}
            options={[
              { label: "Success", value: "success" },
              { label: "500 Error", value: "500" },
            ]}
          />
        </>
      )}
    </div>
  );
}
