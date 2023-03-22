import React, { useEffect, useState } from "react";
import useRooms from "../API/Services/useRooms";
import Button from "./Inputs/Button";
import DropdownInput from "./Inputs/DropdownInput";
import TextInput from "./Inputs/TextInput";
import Modal from "./Modal/Modal";

type RoomType = {
  name: string;
  id: number;
};
type LobbyProps = {
  joinRoom: (user: string, room: string) => void;
  room: string;
  setRoom: (value: string) => void;
};
const Lobby = ({ joinRoom, room, setRoom }: LobbyProps) => {
  const [isAddingRoom, setIsAddingRoom] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const [newRoom, setNewRoom] = useState<string>("");

  const { getRooms, addRoom: addRoomRequest } = useRooms();

  const getData = async () => {
    const resp = await getRooms();
    setRooms(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const addRoom = (name: string) => {
    addRoomRequest(name);
    setIsAddingRoom(false);
  };

  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          joinRoom(user, room);
        }}
      >
        <TextInput placeholder="name" onChange={setUser} value={user} />
        {/* <TextInput placeholder="room" onChange={setRoom} value={room} /> */}
        <DropdownInput
          placeholder="room"
          options={rooms.map((r) => {
            return { label: r.name, value: r.id };
          })}
          value={room}
          setValue={setRoom}
        />
        <div className="flex justify-end">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsAddingRoom(true);
            }}
          >
            Add Room
          </Button>
        </div>
        <Button disabled={!user || !room}>Join</Button>
      </form>
      <Modal
        showModal={isAddingRoom}
        onRequestClose={() => setIsAddingRoom(false)}
      >
        <h3>Add Room</h3>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addRoom(newRoom);
          }}
        >
          <TextInput placeholder="name" value={newRoom} onChange={setNewRoom} />
          <div className="flex flex-row gap-2 items-center justify-center">
            <Button onClick={() => {}}>Add</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsAddingRoom(false);
              }}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Lobby;
