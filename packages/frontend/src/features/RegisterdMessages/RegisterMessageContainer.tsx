import { TextButton } from "../../ui";
import { useDialog } from "../../ui/Dialog";
import { RegisterMessage } from "./components/RegisterMessage";

interface Props {
  handleRegisterMessage: (title: string, body:string) => void;
}

export const RegisterMessageContainer = ({handleRegisterMessage}: Props) => {
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

