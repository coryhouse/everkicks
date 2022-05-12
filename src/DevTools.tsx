import { useState } from "react";
import SelectInput from "./reusable/SelectInput";
import "./DevTools.css";
import { User } from "./types/types";
import { useUserContext } from "./UserContext";

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(true);
  const { setUser, user } = useUserContext();

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
