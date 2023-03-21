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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7274/chathub")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };
  const closeConnection = async () => {
    try {
      await connection?.stop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"flex flex-col justify-center items-center p-4"}>
      <h1>Chat</h1>
      <div className="w-2/3 p-4">
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

export default App;
