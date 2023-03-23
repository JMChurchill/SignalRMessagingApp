import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastySuccessMessage = (message = "success") =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    type: "success",
  });

export const toastyErrorMessage = (message = "An Error occured") =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    type: "error",
  });
