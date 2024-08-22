import React, { useCallback, useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import {
  ChannelList,
  ChannelPreview,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import UsersMenu from "./UsersMenu";

type ChatSidebarProps = {
  userId: string;
  show: boolean;
  onClose: () => void;
};

const ChatSidebar = ({ userId, show, onClose }: ChatSidebarProps) => {
  const [usersMenuOpen, setUsersMenuOpen] = useState(false);

  useEffect(() => {
    if (!show) setUsersMenuOpen(false);
  }, [show]);
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
      className={`relative w-full flex-col md:max-w-[360px] ${
        show ? "flex" : "hidden"
      }`}
    >
      {usersMenuOpen && (
        <UsersMenu
          userId={userId}
          onClose={() => setUsersMenuOpen(false)}
          onChannelSelected={() => {
            setUsersMenuOpen(false);
            onClose();
          }}
        />
      )}
      <MenuBar onUserMenuClick={() => setUsersMenuOpen(true)} />
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
