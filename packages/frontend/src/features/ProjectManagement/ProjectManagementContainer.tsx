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
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
        text="プロジェクト管理"
        onClick={openDialog}
      />
      <Dialog>
        <ProjectManagement
<<<<<<< HEAD
=======
          // users={otherUsers}
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

