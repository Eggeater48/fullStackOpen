import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message.type === "blog") {
    return <div className={"blog-"}>{message.message}</div>;
  } else if (message.type === "error") {
    return <div className={"error-"}>{message.message}</div>;
  }
};

export default Notification;
