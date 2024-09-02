import { useMemo } from "react";
import styled from "styled-components";

import { BLACK } from "styles/color";
import {
  FONTSIZE_CAPTION,
  FONTWEIGHT_IMPORTANT,
  FONTSIZE_PARAGRAPH,
} from "styles/typography";

interface MessageType {
  id: string;
  userAccountId: string;
  createdAt: string;
  text: string;
}
interface Props {
  message: MessageType;
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

export const Message = ({ message }: Props) => {
  const date = useMemo(() => new Date(message.createdAt), [message]);
  const dateString = date.toLocaleString();
  const dateTimeString = date.toISOString();

  return (
    <MessageLayout>
      <MetaText>
        <UserName>user account_id: {message.userAccountId}</UserName>
        <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
      </MetaText>
      <MessageText>{message.text}</MessageText>
    </MessageLayout>
  );
};
