import React from "react";
import { MessageType } from "../App";
import ConnectedUsers from "./ConnectedUsers";
import Button from "./Inputs/Button";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

type ChatProps = {
  messages: MessageType[];
  sendMessage: (message: string) => void;
  closeConnection: () => void;
  users: string[];
};
const Chat = ({ messages, sendMessage, closeConnection, users }: ChatProps) => {
  return (
    <div>
      <div>
        <Button variant="red" onClick={closeConnection}>
          Leave Room
        </Button>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 4fr" }}>
        <ConnectedUsers users={users} />
        <div>
          <MessageContainer messages={messages} />
          <SendMessageForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
