import { ProjectManagementContainer } from "features/ProjectManagement";
import styled from "styled-components";
import { LAYER_2 } from "styles/color";
import { gutterBy } from "styles/spaces";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 5%;
  padding: ${gutterBy(2)};
  background-color: ${LAYER_2};
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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
    <StyledHeader>
      <Logo>ChatAPP</Logo>
      <HeaderActions>
        <ProjectManagementContainer />
      </HeaderActions>
    </StyledHeader>
  );
};
