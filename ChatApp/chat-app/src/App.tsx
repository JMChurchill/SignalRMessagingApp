import { HubConnectionBuilder } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import React, { useEffect, useState } from "react";
import useMessage from "./API/Services/useMessages";
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
  const [room, setRoom] = useState<string>("");

  const { getMessages: getMessagesByRoom } = useMessage();

  useEffect(() => {
    if (connection && room !== null && room !== "" && room !== "0") {
      getMessages();
    }
  }, [connection]);

  const getMessages = async () => {
    // alert("getting messages for " + room);
    const resp = await getMessagesByRoom(room);
    // console.log(resp);
    setMessages(
      resp.data.map((mes: { text: any; user: { name: string } }) => {
        return {
          message: mes.text,
          user: mes.user.name,
        };
      })
    );
  };

  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7274/chathub")
        .configureLogging(LogLevel.Information)
        .build();
      // connection.on("ReceiveMessage", (user, message) => {
      //   setMessages((messages) => [...messages, { user, message }]);
      // });
      connection.on("ReceiveMessage", (newMessage) => {
        // setMessages(
        //   messages.map((mes: { text: any; user: { name: string } }) => {
        //     return {
        //       message: mes.text,
        //       user: mes.user.name,
        //     };
        //   })
        // );
        setMessages((messages) => [
          ...messages,
          {
            message: newMessage.text,
            user: newMessage.user?.name,
          },
        ]);
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
      // alert(room);
      // alert(user);

      const userConnection = { roomId: parseInt(room), username: user };
      console.log(userConnection);

      if (await connection.invoke("JoinRoom", userConnection))
        setConnection(connection);
      else {
        setConnection(undefined);
        alert("User not found");
      }
      // await connection.invoke("JoinRoom");
      // await connection.invoke("JoinRoom", {
      //   userName: user,
      //   roomId: room as unknown as number,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.error(error);
    }
  };
  const closeConnection = async () => {
    try {
      await connection?.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"flex flex-col justify-center items-center p-4"}>
      <h1>Chat</h1>
      <div className="w-2/3 p-4">
        {!connection ? (
          <Lobby joinRoom={joinRoom} room={room} setRoom={setRoom} />
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
