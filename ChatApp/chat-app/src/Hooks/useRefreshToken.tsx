import axios from "axios";
import React from "react";
import { ChatAPI } from "../API/axios";

const { REACT_APP_CHAT_API_URL } = process.env;

const useRefreshToken = () => {
  const refresh = async () => {
    // check there is a value for product approvals url (there should be nothing will work otherwise...)
    if (
      REACT_APP_CHAT_API_URL === undefined ||
      REACT_APP_CHAT_API_URL === null
    ) {
      return undefined;
    }
    axios.defaults.withCredentials = true; //have to make with credentials globally true for it to work with post requests...
    const response = await ChatAPI.get("/auth/refresh", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": REACT_APP_CHAT_API_URL,
      },
    });
    return response.data.newToken;
  };
  return refresh;
};

export default useRefreshToken;
