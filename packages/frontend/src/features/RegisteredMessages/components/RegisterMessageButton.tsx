import { TextButton, useDialog } from "ui";
import { RegisterMessage } from "./RegisterMessageDialog";

interface Props {
  handleRegisterMessage: (title: string, body:string) => void;
}

export const RegisterMessageButton = ({handleRegisterMessage}: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
        buttonType="primary"
        text="登録"
        onClick={openDialog}
      />
      <Dialog>
        <RegisterMessage
          handleRegisterMessage={handleRegisterMessage}
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

