import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import resolveResponse from "../resolveResponse";

export default function useMessage() {
  const axiosPrivate = useAxiosPrivate();

  const getMessages = async (roomId: string) => {
    const response = await resolveResponse(
      axiosPrivate.get(`Message/Room/${roomId}`)
    );
    return response;
  };

  return { getMessages };
}
