import { ComponentPropsWithoutRef } from "react";
import ChatButton from "./chatButton";
import { LoadingIndicator } from "stream-chat-react";

interface LoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}

const LoadingButton = ({ loading, ...props }: LoadingButtonProps) => {
  return (
    <ChatButton {...props} disabled={loading}>
      {loading ? <LoadingIndicator /> : props.children}
    </ChatButton>
  );
};

export default LoadingButton;
