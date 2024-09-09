import { ProjectManagementContainer } from "features/ProjectManagement";
import styled from "styled-components";
import { gutterBy } from "styles/spaces";

const Logo = styled.div`
  font-size: 1.8rem;
`;

const HeaderActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${gutterBy(2)};
`;

export const Header = () => {
  return (
    <>
      <Logo>ChatAPP</Logo>
      <HeaderActions>
        <ProjectManagementContainer />
      </HeaderActions>
    </>
  );
};
