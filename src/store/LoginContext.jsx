import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [islogin, setIslogin] = useState(
    JSON.parse(localStorage.getItem("islogin"))
  );

  useEffect(() => {
    localStorage.setItem("islogin", JSON.stringify(islogin));
  }, [islogin]);

  function changestatus() {
    setIslogin(!islogin);
  }

  function logout() {
    setIslogin(false);
  }

  return (
    <LoginContext.Provider value={{ islogin, changestatus, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
