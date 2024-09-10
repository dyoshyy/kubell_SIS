import styled from 'styled-components';
import { useDialog } from 'ui';
import { LAYER_1, PRIMARY_COLOR } from '../../../styles/color';
import { gutterBy } from '../../../styles/spaces';
import { FONTWEIGHT_IMPORTANT } from '../../../styles/typography';
import { Project } from "../types";
import { SingleProject } from './SingleProject';
import { NameCell, TableRow } from './Table';

interface Props {
    project: Project
}

const ProjectLabel = styled.div`
  background-color: ${PRIMARY_COLOR};
  padding: ${gutterBy(1)};
  border-radius: 4px;
  color: ${LAYER_1};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  display: inline-block;
`;

export const ProjectManagementItem = ({project}: Props) => {
  const [Dialog, openDialog, closeDialog] = useDialog();

    return (
        <TableRow>
            <NameCell>
              {project.id}
            </NameCell>
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
            {/* <TableCell>
                <SingleProjectButton project={project} />
            </TableCell> */}
        </TableRow>
    );
}

export default ProjectManagementItem;
