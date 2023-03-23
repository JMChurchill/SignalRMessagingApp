import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMessage from "../API/Services/useMessages";
import useRooms from "../API/Services/useRooms";
import Chat from "../Components/Chat";
import useToken from "../Hooks/useToken";
import { toastyErrorMessage } from "../Utils/toastTypes";

export type MessageType = {
  user: string;
  message: string;
};

const ChatPage = () => {
  const { id } = useParams();
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  const { getMessages: getMessagesByRoom } = useMessage();
  const { getRoom: getRoomById } = useRooms();

  const getData = () => {
    if (id) {
      getMessages(id);
      getRoom(id);
      joinRoom(token, id);
    }
  };
  const getRoom = async (id: string) => {
    const resp = await getRoomById(id);
    setRoomName(resp.data?.name);
  };
  const getMessages = async (id: string) => {
    const resp = await getMessagesByRoom(id);
    setMessages(
      resp.data.map((mes: { text: any; user: { name: string } }) => {
        return {
          message: mes.text,
          user: mes.user.name,
        };
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const joinRoom = async (user: string, room: string) => {
    if (!connection) {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7274/chathub", {
            accessTokenFactory: () => token,
          })
          .configureLogging(LogLevel.Information)
          .build();

        connection.on("ReceiveMessage", (newMessage) => {
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
        const userConnection = { roomId: parseInt(room), token: user };
        console.log(userConnection);

        if (await connection.invoke("JoinRoom", userConnection))
          setConnection(connection);
        else {
          setConnection(undefined);
          alert("User not found");
        }
      } catch (error) {
        console.error(error);
        toastyErrorMessage("Unauthorized");
        setToken(null);
      }
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
      navigate(`/`, {
        state: {},
        relative: "path",
      });

      // setToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{roomName}</h2>
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        closeConnection={closeConnection}
        users={users}
      />
    </div>
  );
};

export default ChatPage;
