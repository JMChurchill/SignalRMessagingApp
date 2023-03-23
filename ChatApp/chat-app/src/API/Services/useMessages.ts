import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

export default function useMessage() {
  const axiosPrivate = useAxiosPrivate();

  const getMessages = async (roomId: string) => {
    // const rId = parseInt(roomId)
    const response = await axiosPrivate.get(`Message/Room/${roomId}`);
    return response;
  };

  return { getMessages };
}
