import { useQuery } from '@apollo/client';
import { useFragment } from '__generated__/query';
import { GetGroupChatWithMessagesQuery } from 'features/GroupChat/apis/getGroupChatWithMessages.query';
import { GroupChatFragment } from 'features/GroupChat/components/groupChatFragment.query';
import { useSignedInUser } from 'local-service/auth/hooks';
import { useState } from 'react';
import styled from 'styled-components';
import { RegisteredMessage } from '../types';

interface RegisteredMessageItemProps {
    registeredMessage: RegisteredMessage;
    groupChatId: string;
    handlePostMessage: (registeredMessage: string, groupChatId: string) => void;
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
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s; 
  
  &:hover {
    background-color: #f0f0f0; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    border-radius: 4px; 
  }
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const RegisteredMessageItem = ({ registeredMessage, groupChatId, handlePostMessage }: RegisteredMessageItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: myID } = useSignedInUser();

  const { data } = useQuery(GetGroupChatWithMessagesQuery, {
    variables: {
      groupChatId: registeredMessage.groupChatId,
      userAccountId: myID,
    },
  });

  const groupChat = useFragment(GroupChatFragment, data ? data.getGroupChat: undefined);
  
  const cronToTime = (cronFormular: string) => {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = cronFormular.split(' ').map(part => part.trim());

    const timePart = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    let dayPart = '';

    if(dayOfWeek === '*') {
      if(dayOfMonth === '*') {
        dayPart = '毎日';
      } else {
        dayPart = `毎月${dayOfMonth}日`;
      }
    } else if (dayOfMonth === '*') {
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      dayPart = `毎週${days[parseInt(dayOfWeek, 10)]}曜日`;
    } else {
      dayPart = `毎月${dayOfMonth}日`;
    }

    return `${dayPart}の${timePart}`;
  } 

    return (
      <>
        <MessageContainer>
            <MessageContent onClick={() => setIsModalOpen(true)}>
                <div><strong>タイトル:</strong> {registeredMessage.title}</div>
            </MessageContent>
            <MetaData>
                <div>投稿日: {cronToTime(registeredMessage.cronFormular)}</div>
                <div>投稿先: {groupChat ? groupChat.name : ''}</div>
            </MetaData>
            {groupChatId &&
              <SendButton onClick={() => {handlePostMessage(
                registeredMessage.body, 
                registeredMessage.groupChatId,
              )}}>送信</SendButton>
            }
            
      </MessageContainer>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
            <h3>タイトル: {registeredMessage.title}</h3>
            <p><strong>本文: </strong>{registeredMessage.body}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
    );
};
