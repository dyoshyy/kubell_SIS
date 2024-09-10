import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const ChatButtons = () => {
  return (
    <ChatContainer>
      <ChatButton>Internal Group Chat</ChatButton>
      <ChatButton>External Group Chat</ChatButton>
    </ChatContainer>
  );
};

export default ChatButtons;
