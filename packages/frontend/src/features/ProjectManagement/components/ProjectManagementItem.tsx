import styled from 'styled-components';
<<<<<<< HEAD
import { useDialog } from 'ui';
import { LAYER_1, PRIMARY_COLOR, PRIMARY_COLOR_HOVER } from '../../../styles/color';
import { gutterBy } from '../../../styles/spaces';
import { FONTWEIGHT_IMPORTANT } from '../../../styles/typography';
import { Project } from "../types";
import { SingleProject } from './Project/SingleProject';
import { IDCell, NameCell, TableRow } from './Table';
=======
import { gutterBy } from '../../../styles/spaces';
import { Project } from "../types";
import { SingleProjectButton } from './SingleProjectButton';
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109

interface Props {
    project: Project
}

<<<<<<< HEAD
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
=======
export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

export const TableCell = styled.td`
  padding: ${gutterBy(1)};
  text-align: left;
  vertical-align: middle;
`;


const NameCell = styled(TableCell)`
  width: 90%;
`;

const BusyLabel = styled.div`
  background-color: #e0e0e0;
  padding: ${gutterBy(1)};
  border-radius: 4px;
`;

export const ProjectManagementItem = ({project}: Props) => {
    return (
        <TableRow>
            <NameCell>
                <BusyLabel>{project.name}</BusyLabel>
            </NameCell>
            <SingleProjectButton project = {project}/>
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
        </TableRow>
    );
}

export default ProjectManagementItem;
<<<<<<< HEAD
=======


>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
