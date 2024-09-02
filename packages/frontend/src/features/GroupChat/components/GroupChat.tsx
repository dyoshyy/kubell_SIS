import { useMemo } from "react";
import styled from "styled-components";
import { useFragment } from "__generated__/query";
import { gutterBy } from "styles/spaces";
import { FONTSIZE_HEADER, FONTWEIGHT_IMPORTANT } from "styles/typography";
import {
  GroupChatFragment,
  GroupChatMessagesFragment,
} from "./groupChatFragment.query";
import type {
  MaskedGroupChat,
  MaskedGroupChatMessages,
} from "./groupChatFragment.query";
import { MessageForm } from "./MessageForm";
import { Message } from "./Message";


interface Props {
  groupChatFragment: MaskedGroupChat;
  getMessagesFragment: MaskedGroupChatMessages[];
  onPostMessage: (message: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupChatTitle = styled.h2`
  font-size: ${FONTSIZE_HEADER};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding: ${gutterBy(3)} 0;
`
const MessagesContainer = styled.div`
  overflow-y: auto;
`

const MessageFormWrapper = styled.div`
  margin-top: auto;
  padding: ${gutterBy(2)} 0;
`;

const useGetMessagesFragment = (getMessagesFragment: MaskedGroupChatMessages) =>
  useFragment(GroupChatMessagesFragment, getMessagesFragment);

export const GroupChat = ({
  groupChatFragment,
  getMessagesFragment,
  onPostMessage
}: Props) => {
  const groupChat = useFragment(GroupChatFragment, groupChatFragment);
  const messages = useMemo(
    () => getMessagesFragment.map(useGetMessagesFragment),
    [getMessagesFragment]
  );

  return (
    <Container>
      <GroupChatTitle>{groupChat.name}</GroupChatTitle>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </MessagesContainer>
      <MessageFormWrapper>
        <MessageForm onPostMessage={onPostMessage}/>
      </MessageFormWrapper>
    </Container>
  );
};
