import { useMutation, useQuery } from '@apollo/client';
import { PostMessageMutation } from 'features/GroupChat/apis/postMessage.command';
import { useSignedInUser } from 'local-service/auth/hooks';
import { useCallback } from 'react';
import { CreateRegisteredMessageMutation } from './api/createRegisteredMessage.command';
import { GetRegtisteredMessagesQuery } from './api/getRegisteredMessages.query';
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
    const { data, loading, error, refetch } = useQuery(GetRegtisteredMessagesQuery, {
      variables: {ownerId: myID}
    });

    const handleUpdate = () => refetch();

    const [postMessage] = useMutation(PostMessageMutation, {
        context: { clientName: "command" },
      });
    
    const [createRegisteredMessage] = useMutation(CreateRegisteredMessageMutation, {
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

    const handleRegisterMessage = useCallback(
      (title: string, body: string) => {
        createRegisteredMessage({
          variables: {
            input: {
              title: title,
              body: body,
              ownerId: myID
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
          registeredMessagesFragment={data.getRegisteredMessages}
          onCreateRegisterMessage={handleRegisterMessage} 
          onPostMessage={handlePostMessage}
          onUpdate={handleUpdate}
        />
    </div>
    )
}
