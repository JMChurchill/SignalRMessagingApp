import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Inputs/Button";
import TextInput from "../Components/Inputs/TextInput";

const SignUpPage = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("signing up");
      }}
    >
      <h2>Sign Up</h2>
      <TextInput placeholder="name" value={name} onChange={setName} />
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
