import styled from "styled-components";
import { RegisteredMessage } from "../types";
import { RegisterMessageButton } from "./RegisterMessageButton";
import { RegisteredMessageItem } from "./RegisteredMessageItem";

interface RegisteredMessagesProps {
  onCreateRegisterMessage: (title: string, body: string) => void;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* Align the button to the left */
  margin-bottom: 16px;
`;

const messages: RegisteredMessage[] = [
  {
    id: "1",
    title: "Meeting Reminder",
    body: "Don't forget about the team meeting tomorrow at 10 AM. Please prepare your reports.",
  },
  {
    id: "2",
    title: "Project Update",
    body: "The new project has been approved. We will start planning next Monday. Make sure to review the initial proposal.",
  },
  {
    id: "3",
    title: "Holiday Schedule",
    body: "The office will be closed next Friday for the public holiday. Enjoy the long weekend!",
  },
];

export const RegisteredMessages = ({
  onCreateRegisterMessage,
  onPostMessage,
}: RegisteredMessagesProps) => {
  return (
    <div>
      <ButtonWrapper>
        <RegisterMessageButton onCreateRegisterMessage={onCreateRegisterMessage} />
      </ButtonWrapper>
      <Container>
        {messages.map((message) => (
          <RegisteredMessageItem
            key={message.id}
            message={message}
            onPostMessage={onPostMessage}
          />
        ))}
      </Container>
    </div>
  );
};
