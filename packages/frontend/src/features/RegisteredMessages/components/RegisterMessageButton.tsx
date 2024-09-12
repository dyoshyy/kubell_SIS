import { TextButton, useDialog } from "ui";
import { RegisterMessage } from "./RegisterMessageDialog";

interface Props {
  onCreateRegisterMessage: (title: string, body:string) => void;
}

export const RegisterMessageButton = ({onCreateRegisterMessage}: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
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

