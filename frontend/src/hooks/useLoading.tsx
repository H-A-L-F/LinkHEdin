import React, { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";

const loadingContext = createContext({} as any);

export function LoadingContextProvider({ children }:{children: JSX.Element}) {
  const [loading, setLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {loading ? <Loading /> : children}
    </loadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(loadingContext);
}