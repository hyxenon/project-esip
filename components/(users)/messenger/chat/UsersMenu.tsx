import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Channel, UserResponse } from "stream-chat";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";

type UsersMenuProps = {
  userId: any;
  onClose: () => void;
  onChannelSelected: () => void;
};

const UsersMenu = ({ userId, onClose, onChannelSelected }: UsersMenuProps) => {
  const { client, setActiveChannel } = useChatContext();

  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();

  useEffect(() => {
    async function loadInitialUsers() {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: userId },
          },
          { id: 1 }
        );

        setUsers(response.users);
      } catch (error) {
        console.error(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, userId]);

  function handleChannelSelected(channel: Channel) {
    setActiveChannel(channel);
    onChannelSelected();
  }

  // UserIdTo means the id of the another user. not the id of the user who is currently logged in
  async function startsChatWithUser(userIdTo: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userIdTo, userId],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error creating channel");
    }
  }
  return (
    <div className="str-chat bg-white absolute z-10 h-full w-full border-e border-e-[#DBDDE1]">
      <div className="flex items-center gap-3 p-3 text-lg font-bold">
        <ArrowLeft onClick={onClose} className="cursor-pointer" /> Users
      </div>
      <div>
        {!users && <LoadingUsers />}
        {users?.map((user) => (
          <UserResult
            user={user}
            onUserClicked={startsChatWithUser}
            key={user.id}
          />
        ))}
      </div>
    </div>
  );
};

type UserResultProps = {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
};

const UserResult = ({ user, onUserClicked }: UserResultProps) => {
  return (
    <button
      className="mb-3 w-full flex items-center p-2 gap-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
  );
};

export default UsersMenu;
