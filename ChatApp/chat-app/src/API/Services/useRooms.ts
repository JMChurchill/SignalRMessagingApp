import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import resolveResponse from "../resolveResponse";

export default function useRooms() {
  const axiosPrivate = useAxiosPrivate();

  const getRoom = async (roomId: string) => {
    const response = await resolveResponse(axiosPrivate.get(`room/${roomId}`));
    return response;
  };
  const getRooms = async () => {
    const response = await resolveResponse(axiosPrivate.get("room"));
    return response;
  };
  const addRoom = async (name: string) => {
    const response = await resolveResponse(
      axiosPrivate.post(`room?name=${name}`)
    );
    return response;
  };

  return { getRoom, getRooms, addRoom };
}
