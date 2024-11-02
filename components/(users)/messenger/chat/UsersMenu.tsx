import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Channel, UserResponse } from "stream-chat";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import LoadingButton from "./LoadingButton";
import useDebounce from "@/lib/hooks/useDebounce";
import { Button } from "@/components/ui/button";

type UsersMenuProps = {
  userId: any;
  onClose: () => void;
  onChannelSelected: () => void;
};

const UsersMenu = ({ userId, onClose, onChannelSelected }: UsersMenuProps) => {
  const { client, setActiveChannel } = useChatContext();

  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  const [moreUsersLoading, setMoreUsersLoading] = useState(false);

  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();

  const pageSize = 10;

  useEffect(() => {
    async function loadInitialUsers() {
      setUsers(undefined);
      setEndOfPaginationReached(undefined);

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: userId },
            ...(searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {}),
          },
          { id: 1 },
          {
            limit: pageSize + 1,
          }
        );

        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.error(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, userId, searchInputDebounced]);

  async function loadMoreUsers() {
    setMoreUsersLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const lastUserId = users?.[users.length - 1].id;
      if (!lastUserId) return;

      const response = await client.queryUsers(
        {
          $and: [
            { id: { $ne: userId } },
            { id: { $gt: lastUserId } },
            searchInputDebounced
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
              : {},
          ],
        },
        { id: 1 },
        { limit: pageSize + 1 }
      );

      setUsers([...users, ...response.users.slice(0, pageSize)]);
      setEndOfPaginationReached(response.users.length <= pageSize);
    } catch (error) {
      console.error(error);
      alert("Error loading users");
    } finally {
      setMoreUsersLoading(false);
    }
  }

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

  async function startGroupChat(members: string[], name?: string) {
    try {
      const channel = client.channel("messaging", {
        members,
        name,
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error creating channel");
    }
  }
  return (
    <div className="overflow-y-auto str-chat bg-white absolute z-10 h-full w-full border-e border-e-[#DBDDE1]">
      <div className="flex flex-col p-3">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <ArrowLeft onClick={onClose} className="cursor-pointer" /> Users
        </div>
        <input
          type="search"
          placeholder="Search"
          className="rounded-full border gorder-gray-300 px-4 py-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {selectedUsers.length > 0 && (
        <StartGroupChatHeader
          onConfirm={(name) => startGroupChat([userId, ...selectedUsers], name)}
          onClearSelection={() => setSelectedUsers([])}
        />
      )}
      <div className="">
        {users?.map((user) => (
          <UserResult
            user={user}
            onUserClicked={startsChatWithUser}
            key={user.id}
            selected={selectedUsers.includes(user.id)}
            onChangeSelected={(selected) =>
              setSelectedUsers(
                selected
                  ? [...selectedUsers, user.id]
                  : selectedUsers.filter((userIdTo) => userIdTo !== user.id)
              )
            }
          />
        ))}

        <div className="px-3">
          {!users && !searchInputDebounced && <LoadingUsers />}
          {!users && searchInputDebounced && "Searching..."}
          {users?.length === 0 && <div>No users found</div>}
        </div>
        {endOfPaginationReached === false && (
          <LoadingButton
            onClick={loadMoreUsers}
            loading={moreUsersLoading}
            className="ml-5 w-[80%] bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
          >
            Load more users
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

type UserResultProps = {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
  selected?: boolean;
  onChangeSelected: (selected: boolean) => void;
};

const UserResult = ({
  user,
  onUserClicked,
  selected,
  onChangeSelected,
}: UserResultProps) => {
  return (
    <button
      className="mb-3 w-full flex items-center p-2 gap-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChangeSelected(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        className="mx-1 scale-125"
      />
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

type StartGroupChatHeaderProps = {
  onConfirm: (name?: string) => void;
  onClearSelection: () => void;
};

const StartGroupChatHeader = ({
  onConfirm,
  onClearSelection,
}: StartGroupChatHeaderProps) => {
  const [groupChatNameInput, setGroupChatNameInput] = useState("");

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white p-3 shadow-sm">
      <input
        placeholder="Group name"
        className="rounded border border-gray-300 p-2"
        value={groupChatNameInput}
        onChange={(e) => setGroupChatNameInput(e.target.value)}
      />
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => onConfirm(groupChatNameInput)}
          className="py-2 bg-blue-500 hover:bg-blue-600"
        >
          Start group chat
        </Button>
        <Button
          variant={"ghost"}
          onClick={onClearSelection}
          className="bg-gray-400 text-white hover:text-white hover:bg-gray-500 py-2"
        >
          Clear selection
        </Button>
      </div>
    </div>
  );
};

export default UsersMenu;
