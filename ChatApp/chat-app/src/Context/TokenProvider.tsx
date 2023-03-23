import { createContext, useState, ReactElement } from "react";

const TokenContext = createContext<any>({});

export const TokenProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [token, setToken] = useState<string | null>(null);

  const setT = (token: string | null) => {
    setToken(token);
    // Store token in local storage to percist through refreshes
    if (token === null) token = "";
    sessionStorage.setItem("token", token);
  };
  return (
    <TokenContext.Provider value={{ token, setToken: setT }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
