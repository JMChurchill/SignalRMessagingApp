import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRooms from "../API/Services/useRooms";
import ErrorMessage from "../Components/ErrorMessage";
import AddRoomForm from "../Components/Forms/AddRoomForm";
import Button from "../Components/Inputs/Button";
import Modal from "../Components/Modal/Modal";
import useToken from "../Hooks/useToken";

type RoomType = {
  id: number;
  name: string;
};
const RoomsPage = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();

  const [isAddingRoom, setIsAddingRoom] = useState<boolean>(false);

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getRooms } = useRooms();

  const getData = async () => {
    const resp = await getRooms();
    if (resp.error)
      setErrorMessage(
        resp.error.message ? resp.error.message : "An error occured"
      );
    else setRooms(resp.data.data);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex flex-row gap-4">
        <Button variant="red" onClick={logout}>
          Logout
        </Button>
        <Button variant="green" onClick={() => setIsAddingRoom(true)}>
          Add Room
        </Button>
      </div>
      <h2>Rooms</h2>
      <div>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        {rooms.map((r) => (
          <p
            className="text-teal-400 underline hover:no-underline cursor-pointer"
            key={r.id}
            onClick={() => {
              navigate(`/Room/${r.id}`, {
                state: {},
                relative: "path",
              });
            }}
          >
            {r.name}
          </p>
        ))}
      </div>
      <Modal
        showModal={isAddingRoom}
        onRequestClose={() => setIsAddingRoom(false)}
      >
        <AddRoomForm
          refreshFunction={getData}
          close={() => setIsAddingRoom(false)}
        />
      </Modal>
    </>
  );
};

export default RoomsPage;
