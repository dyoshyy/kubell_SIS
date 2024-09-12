import styled from 'styled-components';
import { RegisterMessageButton } from './RegisterMessageButton';


interface RegisteredMessagesProps {
    onCreateRegisterMessage: (title: string, body: string) => void;
    onPostMessage: (message: string) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const RegisteredMessages = ({onCreateRegisterMessage, onPostMessage }: RegisteredMessagesProps) => {

    return (
        <div>
            <RegisterMessageButton 
                onCreateRegisterMessage={onCreateRegisterMessage}>
            </RegisterMessageButton>
            {/* <Container>
                {messages.map((message) => (
                    <RegisteredMessageItem message={message} onPostMessage={onPostMessage}></RegisteredMessageItem>
                ))}
            </Container> */}
        </div>
    );
};
