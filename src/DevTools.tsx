import { useState } from "react";
import SelectInput from "./reusable/SelectInput";

export default function DevTools() {
  const [user, setUser] = useState("customer");

  return (
    <div>
      <SelectInput
        id="user"
        label="User"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        options={[
          { label: "Customer", value: "customer" },
          { label: "Admin", value: "admin" },
        ]}
      />
    </div>
  );
}
