import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { Project } from "../types";
import { SingleProjectButton } from './SingleProjectButton';

interface Props {
    project: Project
}

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

const ProjectLabel = styled.div`
  background-color: #e0e0e0;
  padding: ${gutterBy(1)};
  border-radius: 4px;
`;

export const ProjectManagementItem = ({project}: Props) => {
    return (
        <TableRow>
            <NameCell>
                <ProjectLabel>{project.name}</ProjectLabel>
            </NameCell>
            <SingleProjectButton project = {project}/>
        </TableRow>
    );
}

export default ProjectManagementItem;


