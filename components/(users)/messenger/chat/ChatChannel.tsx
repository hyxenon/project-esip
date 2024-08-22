import React from "react";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

type ChatChannelProps = {
  show: boolean;
  hideChannelOnThread: boolean;
};

const ChatChannel = ({ show, hideChannelOnThread }: ChatChannelProps) => {
  return (
    <div className={`flex-1 ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window hideOnThread={hideChannelOnThread}>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
};

export default ChatChannel;
