import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-top: 16px;
`;

export const EmptyGroupChat = () => {
  return (
    <Container>
      <Message>
        グループチャット一覧からグループチャットを選択するか、グループチャットを新規に作成しましょう
      </Message>
    </Container>
  );
};
