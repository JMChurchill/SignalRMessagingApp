import { HubConnectionBuilder } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useMessage from "./API/Services/useMessages";
import "./App.css";
import Chat from "./Components/Chat";
import Lobby from "./Components/Lobby";
import useToken from "./Hooks/useToken";
import AuthRoutes from "./Router/AuthRoutes";
import ContentRoutes from "./Router/ContentRoutes";

export type MessageType = {
  user: string;
  message: string;
};

function App() {
  // const [connection, setConnection] = useState<HubConnection>();
  // const [messages, setMessages] = useState<MessageType[]>([]);
  // const [users, setUsers] = useState<string[]>([]);
  // const [room, setRoom] = useState<string>("");

  const { token, setToken } = useToken();

  useEffect(() => {
    // check local storage for token
    setToken(sessionStorage.getItem("token"));
  }, []);

  // const { getMessages: getMessagesByRoom } = useMessage();

  // useEffect(() => {
  //   if (connection && room !== null && room !== "" && room !== "0") {
  //     getMessages();
  //   }
  // }, [connection]);

  // const getMessages = async () => {
  //   const resp = await getMessagesByRoom(room);
  //   setMessages(
  //     resp.data.map((mes: { text: any; user: { name: string } }) => {
  //       return {
  //         message: mes.text,
  //         user: mes.user.name,
  //       };
  //     })
  //   );
  // };

  // const joinRoom = async (user: string, room: string) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl("https://localhost:7274/chathub")
  //       .configureLogging(LogLevel.Information)
  //       .build();

  //     connection.on("ReceiveMessage", (newMessage) => {
  //       setMessages((messages) => [
  //         ...messages,
  //         {
  //           message: newMessage.text,
  //           user: newMessage.user?.name,
  //         },
  //       ]);
  //     });
  //     connection.on("UsersInRoom", (users) => {
  //       setUsers(users);
  //     });

  //     connection.onclose((e) => {
  //       setConnection(undefined);
  //       setMessages([]);
  //       setUsers([]);
  //     });
  //     await connection.start();
  //     const userConnection = { roomId: parseInt(room), username: user };
  //     console.log(userConnection);

  //     if (await connection.invoke("JoinRoom", userConnection))
  //       setConnection(connection);
  //     else {
  //       setConnection(undefined);
  //       alert("User not found");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const sendMessage = async (message: string) => {
  //   try {
  //     await connection?.invoke("SendMessage", message);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const closeConnection = async () => {
  //   try {
  //     await connection?.stop();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={"flex flex-col justify-center items-center p-4"}>
      {token === null || token === undefined || token === "" ? (
        <AuthRoutes setToken={setToken} />
      ) : (
        <ContentRoutes />
      )}
      <ToastContainer />
    </div>
  );

  // return (
  //   <div className={"flex flex-col justify-center items-center p-4"}>
  //     <h1>Chat</h1>
  //     <div className="w-2/3 p-4">
  //       {!connection ? (
  //         <Lobby joinRoom={joinRoom} room={room} setRoom={setRoom} />
  //       ) : (
  //         <Chat
  //           messages={messages}
  //           sendMessage={sendMessage}
  //           closeConnection={closeConnection}
  //           users={users}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
}

export default App;
