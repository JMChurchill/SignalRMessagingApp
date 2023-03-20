import { HubConnectionBuilder } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";
import Lobby from "./Components/Lobby";

export type MessageType = {
  user: string;
  message: string;
};

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [theMessages, setMessages] = useState<MessageType[]>([]);
  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7274/chathub")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceiveMessage", (user, message) => {
        setMessages([...theMessages, { user, message }]);
      });
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("---");

    console.log(theMessages);
  }, [theMessages]);

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"flex flex-col justify-center items-center p-4"}>
      <h1>Chat</h1>
      <div className="w-1/2 p-4">
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <Chat messages={theMessages} sendMessage={sendMessage} />
        )}
      </div>
    </div>
  );
}

export default App;
