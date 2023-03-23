import React from "react";
import { Route, Routes as RouteWrapper } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";

type AuthRoutesProps = {
  setToken: (token: string) => void;
};
const AuthRoutes = ({ setToken }: AuthRoutesProps) => {
  return (
    <RouteWrapper>
      <Route index element={<LoginPage setToken={setToken} />} />
      <Route path="/Signup" element={<SignUpPage />} />
      <Route path="/*" element={<LoginPage setToken={setToken} />} />
    </RouteWrapper>
  );
};

export default AuthRoutes;
