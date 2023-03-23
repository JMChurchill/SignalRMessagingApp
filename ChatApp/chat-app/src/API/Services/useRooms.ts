import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

export default function useRooms() {
  const axiosPrivate = useAxiosPrivate();

  const getRoom = async (roomId: string) => {
    const response = await axiosPrivate.get(`room/${roomId}`);
    return response;
  };
  const getRooms = async () => {
    const response = await axiosPrivate.get("room");
    return response;
  };
  const addRoom = async (name: string) => {
    const response = await axiosPrivate.post(`room?name=${name}`);
    return response;
  };

  return { getRoom, getRooms, addRoom };
}
