// src/components/ToastService.jsx
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = ({
  message = "Something happened!",
  type = "info", // "success", "error", "warning", "info"
  position = "bottom-center",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = false,
  theme = "colored",
}) => {
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    theme,
    transition: Bounce,
    style: {
      fontSize: "1.6rem",
    },
  });
};
