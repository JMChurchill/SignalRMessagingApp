import React, { useState } from "react";
import Button from "./Inputs/Button";
import TextInput from "./Inputs/TextInput";

type LobbyProps = {
  joinRoom: (user: string, room: string) => void;
};
const Lobby = ({ joinRoom }: LobbyProps) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(user, room);
      }}
    >
      <TextInput placeholder="name" onChange={setUser} value={user} />
      <TextInput placeholder="room" onChange={setRoom} value={room} />
      <Button disabled={!user || !room}>Join</Button>
    </form>
  );
};

export default Lobby;
