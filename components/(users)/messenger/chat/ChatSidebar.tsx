import React, { useCallback } from "react";
import MenuBar from "./MenuBar";
import {
  ChannelList,
  ChannelPreview,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";

type ChatSidebarProps = {
  userId: string;
  show: boolean;
  onClose: () => void;
};

const ChatSidebar = ({ userId, show, onClose }: ChatSidebarProps) => {
  const ChannelPreviewCostum = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );
  return (
    <div
      className={`w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}
    >
      <MenuBar />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [userId] },
        }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [userId] } },
            },
          },
        }}
        Preview={ChannelPreviewCostum}
      />
    </div>
  );
};

export default ChatSidebar;
