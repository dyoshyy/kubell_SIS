import styled from 'styled-components';
import { LAYER_1, PRIMARY_COLOR } from '../../../styles/color';
import { gutterBy } from '../../../styles/spaces';
import { FONTWEIGHT_IMPORTANT } from '../../../styles/typography';
import { Project } from "../types";
import { SingleProjectButton } from './SingleProjectButton';
import { NameCell, TableCell, TableRow } from './Table';

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
    return (
        <TableRow>
            <NameCell>
                <ProjectLabel>{project.name}</ProjectLabel>
            </NameCell>
            <TableCell>
                <SingleProjectButton project={project} />
            </TableCell>
        </TableRow>
    );
}

export default ProjectManagementItem;
