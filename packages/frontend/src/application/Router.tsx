import { useContext, useState } from "react";
import styled from "styled-components";

import { AuthenticateContainer } from "features/Authenticate";
import { CreateGroupChatDialogContainer } from "features/CreateGroupChatDialog";
import { GroupChatContainer } from "features/GroupChat";
import { GroupChatsContainer } from "features/GroupChats";
import { Header } from "features/Header";
import { AuthContext } from "local-service/auth/AuthProvider";
import { LAYER_1 } from "styles/color";
import { gutterBy } from "styles/spaces";

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
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

  return (
    <>
    <Header />
    <RootContainer>
      <GroupChatControls>
        <CreateGroupChatDialogContainer />
        <GroupChatsContainer handleChangeGroupChat={setSelectedGroupChatId} />
      </GroupChatControls>

      <GroupChatWrapper>
        <GroupChatContainer groupChatId={selectedGroupChatId} />
      </GroupChatWrapper>
    </RootContainer>
    </>

  );
};
