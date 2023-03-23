import React, { useEffect } from "react";
import { ChatAPIPrivate } from "../API/axios";
import useRefreshToken from "./useRefreshToken";
import useToken from "./useToken";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { token, setToken } = useToken();

  const requestIntercept = ChatAPIPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    const responseIntercept = ChatAPIPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          try {
            // Only want to retry once (stop endless loop)
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            // if the new access token does not have a value there's no point continueing
            if (newAccessToken === undefined || newAccessToken === null) {
              setToken(null);
              return Promise.reject();
            }
            setToken(newAccessToken);
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return ChatAPIPrivate(prevRequest);
          } catch (error) {
            // if response status is 401 we know the refresh token is expired
            if (error?.response?.status === 401) setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    //use cleanup function to remove interceptors
    return () => {
      ChatAPIPrivate.interceptors.response.eject(responseIntercept);
      ChatAPIPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token, refresh]);

  return ChatAPIPrivate;
};

export default useAxiosPrivate;
