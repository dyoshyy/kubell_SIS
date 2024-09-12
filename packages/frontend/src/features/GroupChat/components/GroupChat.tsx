import { useFragment } from "__generated__/query";
import { useMemo } from "react";
import styled from "styled-components";
import { gutterBy } from "styles/spaces";
import { FONTSIZE_HEADER, FONTWEIGHT_IMPORTANT } from "styles/typography";
import type {
  MaskedGroupChat,
  MaskedGroupChatMessages,
} from "./groupChatFragment.query";
import {
  GroupChatFragment,
  GroupChatMessagesFragment,
} from "./groupChatFragment.query";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";

interface Props {
  groupChatFragment: MaskedGroupChat;
  getMessagesFragment: MaskedGroupChatMessages[];
  onPostMessage: (message: string) => void;
  onDeleteMessage: (messageID: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const GroupChatTitle = styled.h2`
  font-size: ${FONTSIZE_HEADER};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding: ${gutterBy(2)};
`;

const MessagesContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 20vh - ${gutterBy(3)}); /* 高さを計算 */
  box-sizing: border-box;
`;

const MessageFormWrapper = styled.div`
  position: sticky;
  bottom: 0;
  padding: ${gutterBy(2)} 0;
  background-color: #ffffff; /* Ensure it stands out from the messages */
  z-index: 10; /* Ensure it stays on top of other content */
  box-sizing: border-box;
`;

const useGetMessagesFragment = (getMessagesFragment: MaskedGroupChatMessages) =>
  useFragment(GroupChatMessagesFragment, getMessagesFragment);

export const GroupChat = ({
  groupChatFragment,
  getMessagesFragment,
  onPostMessage,
  onDeleteMessage,
}: Props) => {
  const groupChat = useFragment(GroupChatFragment, groupChatFragment);
  const messages = useMemo(
    () => getMessagesFragment.map(useGetMessagesFragment),
    [getMessagesFragment],
  );

  return (
    <Container>
      <GroupChatTitle>{groupChat.name}</GroupChatTitle>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id} message={message} onDeleteMessage={onDeleteMessage}/>
        ))}
      </MessagesContainer>
      <MessageFormWrapper>
        <MessageForm onPostMessage={onPostMessage} />
      </MessageFormWrapper>
    </Container>
  );
};

