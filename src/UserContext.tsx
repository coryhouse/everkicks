import { createContext, useContext, useState } from "react";
import { User } from "./types/types";

type UserContextValue = {
  user: User;
  setUser: (user: User) => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>("admin");

  // These are the values we want to expose via context.
  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (userContext === null) {
    throw new Error(
      "useUserContext must be called from a component that's a child of UserContextProvider"
    );
  }

  return userContext;
}
