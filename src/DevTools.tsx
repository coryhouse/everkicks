import { useState } from "react";
import SelectInput from "./reusable/SelectInput";
import "./DevTools.css";

export type User = "customer" | "admin";

type DevToolsProps = {
  user: User;
  setUser: (user: User) => void;
};

export default function DevTools({ user, setUser }: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="devtools">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
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
      )}
    </div>
  );
}
