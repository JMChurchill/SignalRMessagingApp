import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import useToken from "./Hooks/useToken";
import AuthRoutes from "./Router/AuthRoutes";
import ContentRoutes from "./Router/ContentRoutes";

export type MessageType = {
  user: string;
  message: string;
};

function App() {
  const { token, setToken } = useToken();

  useEffect(() => {
    // check local storage for token
    setToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <div className={"flex flex-col justify-center items-center p-4"}>
      {token === null || token === undefined || token === "" ? (
        <AuthRoutes setToken={setToken} />
      ) : (
        <ContentRoutes />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
