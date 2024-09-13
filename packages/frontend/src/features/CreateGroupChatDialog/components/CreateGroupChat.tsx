import { useState } from 'react';
import styled from 'styled-components';

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
  onCreate: (title: string, userIds: string[]) => void;
  onClose: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 24px;
`;

const Caption = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 8px;
`;

const TextField = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const UserCheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 24px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #34495e;
  cursor: pointer;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 30px;
  height: 30px;
  border: 2px solid #3498db;
  border-radius: 6px;
  margin-right: 12px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #3498db;
  }

  &:checked::after {
    content: '✔';
    font-size: 18px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${props => props.primary ? `
    background-color: #3498db;
    color: white;
  ` : `
    background-color: #ecf0f1;
    color: #34495e;
  `}

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export function CreateGroupChat({ users, onCreate, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const handleClickCreate = () => {
    onCreate(title, Array.from(selectedUsers));
    onClose();
  };

  const handleChangeSelectedUser = (id: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Container>
      <ContentContainer>
        <Title>新しいグループチャットを作成</Title>
        <Caption>グループチャットのタイトルを入力してください：</Caption>
        <TextField
          type="text"
          placeholder="グループチャットのタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <Caption>
          グループチャットに所属させるユーザーを選択してください：
        </Caption>
        <UserCheckboxContainer>
          {users.map((user) => (
            <CheckboxLabel key={user.id}>
              <Checkbox
                type="checkbox"
                checked={selectedUsers.has(user.id)}
                onChange={() => handleChangeSelectedUser(user.id)}
              />
              {user.name}
            </CheckboxLabel>
          ))}
        </UserCheckboxContainer>
      </ContentContainer>
      <ButtonContainer>
        <Button onClick={onClose}>キャンセル</Button>
        <Button primary onClick={handleClickCreate}>作成</Button>
      </ButtonContainer>
    </Container>
  );
}
