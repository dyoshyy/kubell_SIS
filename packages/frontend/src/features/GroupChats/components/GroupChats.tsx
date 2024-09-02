import { useFragment } from "__generated__/query";
import styled from "styled-components";
import { gutterBy } from "styles/spaces";
import { TextButton } from "ui";
import {
  GroupChatsFragment,
  MaskedGroupChats,
} from "./groupChatsFragment.query";

interface Props {
  groupChatsFragment: MaskedGroupChats[];
  onUpdate: () => void;
  onChangeGroupChat: (groupChatId: string) => void;
}

const GroupChatList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  list-style: none;
`;

const GroupChatItem = styled.li`
  padding: ${gutterBy(1)} 0;
`;

const useGroupChatsFragment = (groupChatsFragment: MaskedGroupChats) =>
  useFragment(GroupChatsFragment, groupChatsFragment);

export const GroupChats = ({
  groupChatsFragment,
  onUpdate,
  onChangeGroupChat,
}: Props) => {
  const groupChats = groupChatsFragment.map(useGroupChatsFragment);

  return (
    <>
      <TextButton
        buttontype="default"
        text="グループチャット一覧を更新する"
        onClick={onUpdate}
      />
      <hr />
      <GroupChatList role="list">
        {groupChats.map((groupChat) => (
          <GroupChatItem
            key={groupChat.id}
            role="listitem"
            aria-label={groupChat.name}
          >
            <TextButton
              buttontype="none"
              text={groupChat.name}
              onClick={() => onChangeGroupChat(groupChat.id)}
            />
          </GroupChatItem>
        ))}
      </GroupChatList>
    </>
  );
};
