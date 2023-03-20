import React from "react";
import { MessageType } from "../App";

type MessageContainerProps = {
  messages: MessageType[];
};
const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <div>{message.message}</div>
          <div>{message.user}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
