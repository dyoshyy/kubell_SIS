import styled from 'styled-components';

const DetailsContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;

const Details = () => {
  return (
    <DetailsContainer>
      <h3>Details</h3>
      <p>プロジェクトの詳細情報がここに入ります。</p>
    </DetailsContainer>
  );
};

export default Details;
