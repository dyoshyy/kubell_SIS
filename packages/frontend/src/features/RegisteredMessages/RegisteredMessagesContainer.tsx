import { useMutation, useQuery } from '@apollo/client';
import { PostMessageMutation } from 'features/GroupChat/apis/postMessage.command';
import { useSignedInUser } from 'local-service/auth/hooks';
import { useCallback, useEffect } from 'react';
import { CreateRegisteredMessageMutation } from './api/createRegisteredMessage.command';
import { GetRegisteredMessagesQuery } from './api/getRegisteredMessages.query';
import { RegisteredMessages } from './components/RegisteredMessages';

export interface RegisteredMessagesContainerProps {
    groupChatId: string;
}

export const RegisteredMessagesContainer = ({groupChatId}: RegisteredMessagesContainerProps) => {
    const { id: myID } = useSignedInUser();
    // const [registeredMessages, setRegisteredMessages] = useState<RegisteredMessage[]>([]);

    // const handleRegisterMessage = (title: string, body: string) => {
    //     setRegisteredMessages([...registeredMessages, { id: '0', title: title, body: body }]);
    // }
    const { data, loading, error, refetch } = useQuery(GetRegisteredMessagesQuery, {
         variables: {ownerId: myID}
    });

    useEffect(() => {
      const timer = globalThis.setInterval(refetch, 2000);
      return () => globalThis.clearInterval(timer);
    }, [refetch]);

    const [postMessage] = useMutation(PostMessageMutation, {
        context: { clientName: "command" },
      });
    
    const [createRegisteredMessage] = useMutation(CreateRegisteredMessageMutation, {
      context: { clientName: "command" },
    });

    const handlePostMessage = useCallback(
      (message: string, groupChatId: string) => {
        postMessage({
          variables: {
            input: {
              groupChatId: groupChatId,
              executorId: myID,
              content: message,
            },
          },
        });
      },
      [postMessage, myID],
    );

    const handleRegisterMessage = useCallback(
      (title: string, body: string, groupChatId: string, cronFormular: string) => {
        createRegisteredMessage({
          variables: {
            input: {
              title: title,
              body: body,
              ownerId: myID,
              groupChatId: groupChatId,
              cronFormular: cronFormular
            },
          },
        });
      },
      [createRegisteredMessage, myID],
    );

    if(error) return <p>Error Happened</p>;

    if(loading || data?.getRegisteredMessages === undefined) return <></>;

    return (
      <div style={{ width: '100%' }}> {}
        <RegisteredMessages
          groupChatId={groupChatId}
          registeredMessagesFragment={data.getRegisteredMessages}
          onCreateRegisterMessage={handleRegisterMessage} 
          onPostMessage={handlePostMessage}
        />
    </div>
    )
}
