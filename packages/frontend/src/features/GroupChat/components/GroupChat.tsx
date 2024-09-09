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
  padding: ${gutterBy(3)} 0;
`;

const MessagesContainer = styled.div`
  flex-grow: 1; /* 残りのスペースを埋める */
  overflow-y: auto;
  box-sizing: border-box;
`;

const MessageFormWrapper = styled.div`
  padding: ${gutterBy(2)} 0;
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

