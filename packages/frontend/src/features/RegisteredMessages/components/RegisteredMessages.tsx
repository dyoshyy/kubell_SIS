import styled from 'styled-components';
import { RegisteredMessage } from '../types';
import { RegisteredMessageItem } from './RegisteredMessageItem';


interface RegisteredMessagesProps {
    messages: RegisteredMessage[];
    handleRegisterMessage: (title: string, body: string) => void;
    handlePostMessage: (message: string) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const RegisteredMessages = ({messages, handleRegisterMessage, handlePostMessage }: RegisteredMessagesProps) => {

    return (
        <div>
            {/* ここに登録ボタン */}
            <Container>
                {messages.map((message) => (
                    <RegisteredMessageItem message={message} handlePostMessage={handlePostMessage}></RegisteredMessageItem>
                ))}
            </Container>
        </div>
    );
};
