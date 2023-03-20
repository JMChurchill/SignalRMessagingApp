import React from "react";
import { MessageType } from "../App";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

type ChatProps = {
  messages: MessageType[];
  sendMessage: (message: string) => void;
};
const Chat = ({ messages, sendMessage }: ChatProps) => {
  return (
    <div>
      <MessageContainer messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
