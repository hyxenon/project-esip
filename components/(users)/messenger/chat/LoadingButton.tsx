import { ComponentPropsWithoutRef } from "react";
import ChatButton from "./chatButton";
import { LoadingIndicator } from "stream-chat-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}

const LoadingButton = ({ loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <LoadingIndicator /> : props.children}
    </Button>
  );
};

export default LoadingButton;
