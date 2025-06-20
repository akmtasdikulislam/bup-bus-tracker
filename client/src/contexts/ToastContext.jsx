import toast, { Toaster } from "react-hot-toast";
import { ToastContext } from "../hooks/useToast";

export const ToastProvider = ({ children }) => {
  // Custom reusable toast functions
  const notifySuccess = (message = "Action successful") =>
    toast.success(message, { duration: 3000 });

  const notifyError = (message = "Something went wrong") =>
    toast.error(message, { duration: 4000 });

  const notifyInfo = (message = "Loading...") =>
    toast(message, { icon: "ℹ️", duration: 3000 });

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo }}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};
