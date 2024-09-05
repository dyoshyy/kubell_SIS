import { useMemo } from "react";
import styled from "styled-components";

import { BLACK } from "styles/color";
import {
  FONTSIZE_CAPTION,
  FONTSIZE_PARAGRAPH,
  FONTWEIGHT_IMPORTANT,
} from "styles/typography";
import { TextButton } from "ui";

interface MessageType {
  id: string;
  userAccountId: string;
  createdAt: string;
  text: string;
}
interface Props {
  message: MessageType;
  onDeleteMessage: (messageID: string) => void;
}

const MessageLayout = styled.div`
  border-bottom: 1px dashed ${BLACK};
  padding: 8px;
`;
const MetaText = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const UserName = styled.span`
  font-size: ${FONTSIZE_CAPTION};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding-right: 8px;
`;

const DateTime = styled.time`
  width: 150px;
  font-size: ${FONTSIZE_CAPTION};
`;
const MessageText = styled.p`
  font-size: ${FONTSIZE_PARAGRAPH};
`;

export const Message = ({ message, onDeleteMessage }: Props) => {
  const date = useMemo(() => new Date(message.createdAt), [message]);
  const dateString = date.toLocaleString();
  const dateTimeString = date.toISOString();

  const handleClickDelete = () => {
    onDeleteMessage(message.id);
  }

  return (
    <MessageLayout>
      <MetaText>
        <UserName>user account_id: {message.userAccountId}</UserName>
        <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
      </MetaText>
      <MessageText>{message.text}</MessageText>
      <TextButton 
        buttontype="primary" 
        text="削除"
        onClick={handleClickDelete}  
      />
    </MessageLayout>
  );
};
