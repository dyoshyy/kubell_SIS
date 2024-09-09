import { TextButton } from "../../ui";
import { useDialog } from "../../ui/Dialog";
import { ProjectManagement } from "./components/ProjectManagement";


export const ProjectManagementContainer = () => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
        buttontype="primary"
        text="プロジェクト管理"
        onClick={openDialog}
      />
      <Dialog>
        <ProjectManagement
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

