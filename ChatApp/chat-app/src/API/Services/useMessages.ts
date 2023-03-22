import { ChatAPI } from "../axios";

export default function useMessage() {
  const getMessages = async (roomId: string) => {
    // const rId = parseInt(roomId)
    const response = await ChatAPI.get(`Message/Room/${roomId}`);
    return response;
  };

  return { getMessages };
}
