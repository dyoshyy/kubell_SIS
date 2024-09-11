import { useState } from 'react';
import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';

interface Props {
  handleRegisterMessage: (title: string, body: string) => void;
  onClose: () => void;
}

const Container = styled.div`
  padding: ${gutterBy(2)};
  max-width: 600px;
  width: 100%;
  height: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Caption = styled.p`
  font-size: 24px;
  margin-bottom: ${gutterBy(2)};
  text-align: center;
  font-weight: bold;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  height: 10%;
  padding: ${gutterBy(1)};
  margin-bottom: ${gutterBy(2)};
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  height: 80%;
  padding: ${gutterBy(1)};
  margin-bottom: ${gutterBy(2)};
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gutterBy(3)};
`;

export const RegisterMessage = ({ onClose, handleRegisterMessage }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <Container>
      <Caption>業務連絡の登録</Caption>
      <InputField
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextAreaField
        placeholder="本文"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="登録" onClick={() => handleRegisterMessage(title, body)} />
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
      </ActionButtonContainer>
    </Container>
  );
};
