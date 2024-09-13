import styled from "styled-components";
import { TextButton, useDialog } from "ui";
import { RegisterMessage } from "./RegisterMessageDialog";

interface Props {
  onCreateRegisterMessage: (title: string, body: string, groupChatId:string, cronFormular:string ) => void;
}

// TextButton を引き継いだ RegisterButton コンポーネントを作成
const RegisterButton = styled(TextButton)`
  padding: 10px 20px;  /* 適切なパディングを追加 */
  width: 100%;
  display: inline-block; /* 横長のボタンにする */
  text-align: center;   /* テキストの中央揃え */
`;

export const RegisterMessageButton = ({ onCreateRegisterMessage }: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <RegisterButton
        buttonType="primary"
        text="業務連絡登録"
        onClick={openDialog}
      />
      <Dialog>
        <RegisterMessage
          onCreateRegisterMessage={onCreateRegisterMessage}
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};
