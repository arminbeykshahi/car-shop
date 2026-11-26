import { createContext, useEffect, useState } from "react";

export const DarkContext = createContext();

export function DarkContextProvider({ children }) {
  const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem("darkstatus")),
  );

  function changetheme() {
    setIsdark(!isdark);
  }

  useEffect(() => {
    localStorage.setItem("darkstatus", JSON.stringify(isdark));
  }, [isdark]);

  return (
    <DarkContext.Provider value={{ changetheme, isdark }}>
      {children}
    </DarkContext.Provider>
  );
}
