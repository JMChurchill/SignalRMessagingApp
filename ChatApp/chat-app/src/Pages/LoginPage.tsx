import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../API/Services/useAuth";
import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Inputs/Button";
import TextInput from "../Components/Inputs/TextInput";

type LoginPageProps = {
  setToken: (token: string) => void;
};
const LoginPage = ({ setToken }: LoginPageProps) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { login } = useAuth();

  const navigate = useNavigate();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);
        const resp = await login(name);
        console.log(resp);
        if (resp.error) setErrorMessage(resp.error.message);
        else setToken(resp.data.data);

        setIsSubmitting(false);
      }}
    >
      <h2>Login</h2>
      <TextInput placeholder="name" value={name} onChange={setName} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <div className="flex flex-row gap-4 justify-center">
        <Button isLoading={isSubmitting}>Login</Button>
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
