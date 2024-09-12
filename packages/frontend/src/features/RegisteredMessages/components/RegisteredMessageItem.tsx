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
  justify-content: space-between;
  align-items: center;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const SendButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const RegisteredMessageItem = ({ message, handlePostMessage }: RegisteredMessageItemProps) => {
    return (
        <MessageContainer>
            <MessageContent>
                <div>{message.title}</div>
            </MessageContent>
            <SendButton onClick={() => {handlePostMessage(message.body)}}>送信</SendButton>
        </MessageContainer>
    );
}
