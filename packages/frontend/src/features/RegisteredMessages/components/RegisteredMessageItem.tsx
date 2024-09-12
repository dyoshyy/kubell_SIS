import styled from 'styled-components';
import { RegisteredMessage } from '../types';

interface RegisteredMessageItemProps {
    message: RegisteredMessage;
    handlePostMessage: (message: string) => void;
}

const MessageContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div`
  margin-bottom: 10px;
`;

const MetaData = styled.div`
  font-size: 12px;
  color: #555;
`;

const SendButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: #0056b3;
  }
`;

export const RegisteredMessageItem = ({ message, handlePostMessage }: RegisteredMessageItemProps) => {
    return (
        <MessageContainer>
            <MessageContent>
                <div><strong>タイトル:</strong> {message.title}</div>
            </MessageContent>
            <MetaData>
                <div>開始日: {message.startDate}</div>
                <div>頻度: {message.frequency}</div>
                <div>時刻: {message.time}</div>
            </MetaData>
            <SendButton onClick={() => {handlePostMessage(message.body)}}>送信</SendButton>
        </MessageContainer>
    );
};
