import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const ErrorNotification = (message?: string) => {
  toast.error(message, {
    position: "bottom-right",
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      backgroundColor: "red",
      color: "#fff",
    },
  });
};

const SuccessNotification = (message?: string) => {
  toast.success(message, {
    position: "bottom-right",
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      backgroundColor: "green",
      color: "#fff",
    },
  });
};

const ToastNotification = {
  ErrorNotification,
  SuccessNotification,
};

export default ToastNotification;
