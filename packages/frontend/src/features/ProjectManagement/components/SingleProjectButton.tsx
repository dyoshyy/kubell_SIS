import { TextButton, useDialog } from "ui";
import { Project } from "../types";
import { SingleProject } from "./SingleProject";

interface Props {
  project: Project;
}

export const SingleProjectButton = ({ project }: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <div>
      <TextButton
        buttonType="primary"
        text="管理"
        onClick={openDialog}
      />
      <Dialog>
        <SingleProject
          project={project}
          onClose={closeDialog}
        />
      </Dialog>
    </div>
  )
}
