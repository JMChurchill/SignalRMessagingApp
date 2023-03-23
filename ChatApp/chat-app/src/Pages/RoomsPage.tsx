import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRooms from "../API/Services/useRooms";
import Button from "../Components/Inputs/Button";
import useToken from "../Hooks/useToken";

type RoomType = {
  id: number;
  name: string;
};
const RoomsPage = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();

  const [rooms, setRooms] = useState<RoomType[]>([]);

  const { getRooms } = useRooms();

  const getData = async () => {
    const resp = await getRooms();
    console.log(resp);
    setRooms(resp.data);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex flex-row gap-16">
        <h2>Rooms</h2>
        <Button variant="red" onClick={logout}>
          Logout
        </Button>
      </div>
      <div>
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
    </>
  );
};

export default RoomsPage;
