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
  align-items: stretch;
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
  box-sizing: border-box;
  z-index: 100;
`;

const StyledMain = styled.main`
  width: 100%;
  margin-top: 5vh;
  height: 95vh;
  box-sizing: border-box;
  display: flex;
`;

const GroupChatControls = styled.div`
  width: 20%;
  padding: ${gutterBy(1)};
  box-sizing: border-box;
  background-color: ${LAYER_1};
`;

const GroupChatWrapper = styled.div`
  width: 80%;
  padding: 10px;
  box-sizing: border-box;
`;

export const Router = () => {
  const { signedInUser } = useContext(AuthContext);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState("");

  const isSignedIn = signedInUser !== null;
  // MEMO: ページ遷移を工夫したい場合は、react-router-dom などの利用を検討まで
  if (!isSignedIn) {
    return <AuthenticateContainer />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [RegisteredMessages, setRegisteredMessages] = useState([]);


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

        <RegisteredMessagesContainer groupChatId={selectedGroupChatId}/>
      </StyledMain>

    </RootContainer>
  );
};
