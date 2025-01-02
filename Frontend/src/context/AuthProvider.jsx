import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user : {};
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
