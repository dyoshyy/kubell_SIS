import { TextButton } from "../../ui";
import { useDialog } from "../../ui/Dialog";
import { ProjectManagement } from "./components/ProjectManagement";


export const ProjectManagementContainer = () => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
<<<<<<< HEAD
        buttontype="primary"
=======
        buttonType="primary"
        text="プロジェクト管理"
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

