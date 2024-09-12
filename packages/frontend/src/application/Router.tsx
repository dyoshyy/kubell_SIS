import { useContext, useState } from "react";
import styled from "styled-components";

import { AuthenticateContainer } from "features/Authenticate";
import { CreateGroupChatDialogContainer } from "features/CreateGroupChatDialog";
import { GroupChatContainer } from "features/GroupChat";
import { GroupChatsContainer } from "features/GroupChats";
import { Header } from "features/Header";
import { RegisteredMessagesContainer } from "features/RegisteredMessages";
import { AuthContext } from "local-service/auth/AuthProvider";
import { LAYER_1, LAYER_2 } from "styles/color";
import { gutterBy } from "styles/spaces";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  padding: ${gutterBy(2)};
  background-color: ${LAYER_2};
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  box-sizing: border-box;
`;

const StyledMain = styled.main`
  display: flex;
  width: 100%;
  height: 95vh;
  margin-top: 5vh; /* Account for fixed header height */
  box-sizing: border-box;
`;

const GroupChatControls = styled.div`
  width: 20%;
  padding: ${gutterBy(1)};
  background-color: ${LAYER_1};
  box-sizing: border-box;
`;

const GroupChatWrapper = styled.div`
  width: 60%; /* Adjusted to allow space for RegisteredMessagesContainer */
  padding: 10px;
  box-sizing: border-box;
`;

const RegisteredMessagesWrapper = styled.div`
  width: 20%;
  padding: ${gutterBy(1)};
  background-color: ${LAYER_1};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${LAYER_2}; /* Add a subtle divider */
   max-height: 100%; /* Set a maximum height */
  overflow-y: auto;  /* Enable vertical scrolling */
`;

// const MessagesList = styled.div`
//   flex-grow: 1;
//   overflow-y: auto;
//   padding: ${gutterBy(1)};
//   background-color: ${LAYER_1};
// `;

export const Router = () => {
  const { signedInUser } = useContext(AuthContext);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState("");

  const isSignedIn = signedInUser !== null;

  if (!isSignedIn) {
    return <AuthenticateContainer />;
  }

  return (
    <RootContainer>
      <StyledHeader>
        <Header />
      </StyledHeader>

      <StyledMain>
        <GroupChatControls>
          <CreateGroupChatDialogContainer />
          <GroupChatsContainer handleChangeGroupChat={setSelectedGroupChatId} />
        </GroupChatControls>

        <GroupChatWrapper>
          <GroupChatContainer groupChatId={selectedGroupChatId} />
        </GroupChatWrapper>

        <RegisteredMessagesWrapper>
          <RegisteredMessagesContainer groupChatId={selectedGroupChatId} />
        </RegisteredMessagesWrapper>
      </StyledMain>
    </RootContainer>
  );
};
