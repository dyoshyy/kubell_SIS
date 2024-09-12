import styled from 'styled-components';
import { useDialog } from 'ui';
import { LAYER_1, PRIMARY_COLOR, PRIMARY_COLOR_HOVER } from '../../../styles/color';
import { gutterBy } from '../../../styles/spaces';
import { FONTWEIGHT_IMPORTANT } from '../../../styles/typography';
import { Project } from "../types";
import { SingleProject } from './Project/SingleProject';
import { IDCell, NameCell, TableRow } from './Table';

interface Props {
    project: Project
}

const ProjectLabel = styled.button`
  background-color: ${PRIMARY_COLOR};
  padding: ${gutterBy(1)};
  border-radius: 4px;
  color: ${LAYER_1};
  font-size: 24px;
  font-weight: ${FONTWEIGHT_IMPORTANT};
  display: inline-block;
  &:hover {
    cursor: pointer;
    background-color: ${PRIMARY_COLOR_HOVER};
  }
`;

export const ProjectManagementItem = ({project}: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

    return (
        <TableRow>
            <IDCell>
              {project.id}
            </IDCell>
            <NameCell>
              <ProjectLabel onClick={openDialog}>   
                {project.name}
              </ProjectLabel>
              <Dialog>
                <SingleProject
                  project={project}
                  onClose={closeDialog}
                />
              </Dialog>
            </NameCell>
        </TableRow>
    )
}

export default ProjectManagementItem;


