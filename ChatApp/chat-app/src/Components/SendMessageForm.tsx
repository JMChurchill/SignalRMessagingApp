import React, { useState } from "react";
import Button from "./Inputs/Button";
import TextInput from "./Inputs/TextInput";

type SendMessageFormProps = {
  sendMessage: (message: string) => void;
};
const SendMessageForm = ({ sendMessage }: SendMessageFormProps) => {
  const [message, setMessages] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessages("");
      }}
      className="grid gap-2"
      style={{ gridTemplateColumns: "1fr auto" }}
    >
      <TextInput placeholder="message" onChange={setMessages} value={message} />
      <Button disabled={!message}>Send</Button>{" "}
    </form>
  );
};

export default SendMessageForm;
