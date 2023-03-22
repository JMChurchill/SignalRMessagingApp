import { ChatAPI } from "../axios";

export default function useRooms() {
  const getRooms = async () => {
    const response = await ChatAPI.get("room");
    return response;
  };
  const addRoom = async (name: string) => {
    const response = await ChatAPI.post(`room?name=${name}`);
    return response;
  };

  return { getRooms, addRoom };
}
