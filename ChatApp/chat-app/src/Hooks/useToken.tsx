import { useContext } from "react";
import TokenContext from "../Context/TokenProvider";

const useToken = () => {
  return useContext(TokenContext);
};

export default useToken;
