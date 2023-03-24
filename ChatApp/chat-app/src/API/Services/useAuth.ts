import { ChatAPI } from "../axios";
import resolveResponse from "../resolveResponse";

export default function useAuth() {
  const login = async (username: string) => {
    const response = await resolveResponse(
      ChatAPI.post(`Auth/Login`, { username })
    );

    return response;
  };
  const register = async (username: string) => {
    const response = await resolveResponse(
      ChatAPI.post(`Auth/register`, { username })
    );

    return response;
  };

  return { login, register };
}
