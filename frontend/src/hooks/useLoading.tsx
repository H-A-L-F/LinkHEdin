import React, { createContext, useContext, useState } from "react";
import Loading from "../components/LoadingOverlay/Loading";

const loadingContext = createContext({} as any);

export function LoadingContextProvider({ children }:{children: JSX.Element}) {
  const [loading, setLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      <Loading loading={loading}/>
      {children}
    </loadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(loadingContext);
}