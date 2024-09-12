import { useFragment } from '__generated__/query';
import styled from 'styled-components';
import { RegisteredMessageItem } from './RegisteredMessageItem';
import { MaskedRegisteredMessages, RegisteredMessagesFragment } from './registeredMessagesFragment.query';
import { RegisterMessageButton } from './RegisterMessageButton';


interface RegisteredMessagesProps {
    registeredMessagesFragment: MaskedRegisteredMessages[];
    onCreateRegisterMessage: (title: string, body: string, cronExpression: string, startDate: string, frequency: string, time: string) => void;
    onPostMessage: (message: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Add gap between items */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
 
`;


// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start; /* Align the button to the left */
//   margin-bottom: 16px;
// `;

const useRegisteredMessagesFragment = (registeredMessagesFragment: MaskedRegisteredMessages) =>
    useFragment(RegisteredMessagesFragment, registeredMessagesFragment);

export const RegisteredMessages = ({registeredMessagesFragment, onCreateRegisterMessage, onPostMessage }: RegisteredMessagesProps) => {

    const registeredMessages = registeredMessagesFragment.map(useRegisteredMessagesFragment);

    return (
        <div>
            <RegisterMessageButton 
                onCreateRegisterMessage={onCreateRegisterMessage}>
            </RegisterMessageButton>
            <Container>
                {registeredMessages.map((registeredMessage) => (
                    <RegisteredMessageItem message={registeredMessage} handlePostMessage={onPostMessage}></RegisteredMessageItem>
                ))}
            </Container>
        </div>
    );
};
