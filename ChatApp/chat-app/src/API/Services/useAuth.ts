import { ChatAPI } from "../axios";

export default function useAuth() {
  const login = async (username: string) => {
    // const rId = parseInt(roomId)
    const response = await ChatAPI.post(`Auth/Login`, { username });
    return response;
  };

  return { login };
}
