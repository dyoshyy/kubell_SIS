import { useMemo } from "react";
import styled from "styled-components";

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

// MessageLayout コンポーネントに props を追加して動的に背景色を変更
const MessageLayout = styled.div<{ isImportant: boolean }>`
  width: 95%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ isImportant }) => (isImportant ? "#ffcccc" : "#f5f5f5")}; /* isImportant が true なら赤背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MetaText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px; /* DeleteButton 用のスペースを確保 */
`;

const UserName = styled.span`
  font-size: ${FONTSIZE_CAPTION};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding-right: 8px;
`;

const DateTime = styled.time`
  font-size: ${FONTSIZE_CAPTION};
  white-space: nowrap;
  position: absolute;
  top: 8px;
  right: 100px;
  width: auto;
  margin: 0;
`;

const MessageText = styled.p`
  margin-top: 8px;
  font-size: ${FONTSIZE_PARAGRAPH};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const DeleteButton = styled(TextButton)`
  position: absolute; /* Absolute positioning inside relative parent */
  top: 8px;
  right: 8px;
  width: auto;
  margin: 0;
`;

export const Message = ({ message, onDeleteMessage }: Props) => {
  const date = useMemo(() => new Date(message.createdAt), [message]);
  const dateString = date.toLocaleString();
  const dateTimeString = date.toISOString();

  const isImportant = useMemo(() => message.text.startsWith("[重要]"), [message.text]); // メッセージの先頭をチェック

  const handleClickDelete = () => {
    onDeleteMessage(message.id);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginBottom: "16px",
      }}
    >
      <MessageLayout isImportant={isImportant}>
        <MetaText>
          <UserName>user account_id: {message.userAccountId}</UserName>
          <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
        </MetaText>
        <MessageText>{message.text}</MessageText>
        <DeleteButton
          buttonType="danger"
          text="削除"
          onClick={handleClickDelete}
        />
      </MessageLayout>
    </div>
  );
};
