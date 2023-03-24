import axios from "axios";
const { REACT_APP_CHAT_API_URL } = process.env;

console.log(REACT_APP_CHAT_API_URL);

export const ChatAPI = axios.create({
  baseURL: REACT_APP_CHAT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ChatAPIPrivate = axios.create({
  baseURL: REACT_APP_CHAT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
