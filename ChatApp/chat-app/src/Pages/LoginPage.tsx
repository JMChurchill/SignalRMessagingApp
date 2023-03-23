import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../API/Services/useAuth";
import Button from "../Components/Inputs/Button";
import TextInput from "../Components/Inputs/TextInput";

type LoginPageProps = {
  setToken: (token: string) => void;
};
const LoginPage = ({ setToken }: LoginPageProps) => {
  const [name, setName] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const resp = await login(name);
        console.log(resp);
        setToken(resp.data);
      }}
    >
      <h2>Login</h2>
      <TextInput placeholder="name" value={name} onChange={setName} />
      <div className="flex flex-row gap-4 justify-center">
        <Button>Login</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(`/SignUp`, {
              state: {},
              relative: "path",
            });
          }}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
