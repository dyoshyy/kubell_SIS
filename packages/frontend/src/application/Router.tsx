import { useContext, useState } from "react";
import styled from "styled-components";

import { CreateGroupChatDialogContainer } from "features/CreateGroupChatDialog";
import { GroupChatContainer } from "features/GroupChat";
import { GroupChatsContainer } from "features/GroupChats";

import { AuthenticateContainer } from "features/Authenticate";
import { ProjectManagementContainer } from "features/ProjectManagement";
import { RegisteredMessagesContainer } from "features/RegisteredMessages";
import { AuthContext } from "local-service/auth/AuthProvider";
import { LAYER_1 } from "styles/color";
import { gutterBy } from "styles/spaces";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Toolbar = styled.div`
  display: flex;
  background: #cccccc;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px;
  width: 100%;
  height: 50px;
`;

const GroupChatControls = styled.div`
  width: 300px;
  padding: ${gutterBy(2)};
  box-sizing: border-box;
  background-color: ${LAYER_1};
`;

const GroupChatWrapper = styled.div`
  width: calc(100% - 300px);
  padding: 10px;
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
      <Toolbar>
        {/* <button>ビジーネスメンバーリスト</button> */}
        {/* < RegisterMessageContainer handleRegisterMessage={handleRegisterMessage} /> */}
        < ProjectManagementContainer />
      </Toolbar>

      <MainContainer>
        <GroupChatControls>
          <CreateGroupChatDialogContainer />
          <GroupChatsContainer handleChangeGroupChat={setSelectedGroupChatId} />
        </GroupChatControls>

        <GroupChatWrapper>
          <GroupChatContainer groupChatId={selectedGroupChatId} />
        </GroupChatWrapper>

        <RegisteredMessagesContainer groupChatId={selectedGroupChatId}/>
      </MainContainer>
    </RootContainer>
  );
};
