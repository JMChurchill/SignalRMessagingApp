import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../API/Services/useAuth";
import ErrorMessage from "../Components/ErrorMessage";
import Button from "../Components/Inputs/Button";
import TextInput from "../Components/Inputs/TextInput";
import { toastySuccessMessage } from "../Utils/toastTypes";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const navigate = useNavigate();

  const { register } = useAuth();

  const signup = async () => {
    const resp = await register(name);
    if (resp.error)
      setErrorMessage(
        resp.error.message ? resp.error.message : "Unable to create user"
      );
    else {
      toastySuccessMessage("Account created");
      navigate(`/`, {
        state: {},
        relative: "path",
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
    >
      <h2>Sign Up</h2>
      <TextInput placeholder="name" value={name} onChange={setName} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <div className="flex flex-row gap-4 justify-center">
        <Button>Create User</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(`/`, {
              state: {},
              relative: "path",
            });
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
};

export default SignUpPage;
