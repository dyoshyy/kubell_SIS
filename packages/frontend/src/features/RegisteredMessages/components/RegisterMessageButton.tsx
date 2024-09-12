import styled from "styled-components";
import { TextButton, useDialog } from "ui";
import { RegisterMessage } from "./RegisterMessageDialog";

interface Props {
  onCreateRegisterMessage: (title: string, body: string) => void;
}

// TextButton を引き継いだ RegisterButton コンポーネントを作成
const RegisterButton = styled(TextButton)`
  padding: 10px 20px;  /* 適切なパディングを追加 */
  width: auto;         /* 必要に応じて幅を自動調整 */
  max-width: 200px;    /* 最大幅を指定（オプション） */
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
