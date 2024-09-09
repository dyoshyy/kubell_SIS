import { TextButton } from "../../ui";
import { useDialog } from "../../ui/Dialog";
import { ProjectManagement } from "./components/ProjectManagement";


export const BusynessListContainer = () => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
        buttonType="primary"
        text="忙しさリスト"
        onClick={openDialog}
      />
      <Dialog>
        <ProjectManagement
          // users={otherUsers}
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

