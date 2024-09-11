import { useMutation } from '@apollo/client';
import { PostMessageMutation } from 'features/GroupChat/apis/postMessage.command';
import { useSignedInUser } from 'local-service/auth/hooks';
import { useCallback, useState } from 'react';
import { RegisteredMessages } from './components/RegisteredMessages';
import { RegisteredMessage } from './types';

export interface RegisteredMessagesContainerProps {
    groupChatId: string;
}

export const RegisterdMessagesContainer = ({groupChatId}: RegisteredMessagesContainerProps) => {
    const { id: myID } = useSignedInUser();
    const [messages, setMessages] = useState<RegisteredMessage[]>([]);

    const handleRegisterMessage = (title: string, body: string) => {
        setMessages([...messages, { id: '0', title: title, body: body }]);
    }

    const [postMessage] = useMutation(PostMessageMutation, {
        context: { clientName: "command" },
      });

      const handlePostMessage = useCallback(
        (message: string) => {
          postMessage({
            variables: {
              input: {
                groupChatId,
                executorId: myID,
                content: message,
              },
            },
          });
        },
        [groupChatId, postMessage, myID],
      );

    return (
        <RegisteredMessages messages={messages} handleRegisterMessage={handleRegisterMessage} handlePostMessage={handlePostMessage}/>
    )
}
