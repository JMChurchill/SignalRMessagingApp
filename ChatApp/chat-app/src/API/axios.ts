import axios from "axios";

export const ChatAPI = axios.create({
  baseURL: "https://localhost:7274/api/",
  withCredentials: true,
});
