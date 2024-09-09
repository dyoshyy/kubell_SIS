import React from 'react';
import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { User } from "../types";

interface Props {
    user: User
}

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

export const TableCell = styled.td`
  padding: ${gutterBy(1)};
  text-align: left;
  vertical-align: middle;
`;

const AvatarCell = styled(TableCell)`
  width: 60px;
`;

const NameCell = styled(TableCell)`
  width: 20%;
`;

const BusynessCell = styled(TableCell)`
  width: 40%;
`;

const ProjectsCell = styled(TableCell)`
  width: calc(40% - 60px);
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 auto;
`;

const BusyLabel = styled.div`
  background-color: #e0e0e0;
  padding: ${gutterBy(1)};
  border-radius: 4px;
`;

const BusyBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
`;

const BusyBarFill = styled.div`
  height: 100%;
  border-radius: 15px;
  transition: width 0.3s ease;
`;

const BusyValue = styled.div`
  text-align: center;
  margin-top: 5px;
  font-weight: bold;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ProjectChip = styled.span`
  background-color: #e0e0e0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.9em;
`;

const getBusyColor = (value: number) => {
    if (value <= 3) return '#4CAF50';  // 緑
    if (value <= 6) return '#FFC107';  // 黄
    return '#F44336';  // 赤
};

export const ProjectManagementItem = ({user}: Props) => {
    return (
        <TableRow>
            <AvatarCell>
                <Circle />
            </AvatarCell>
            <NameCell>
                <BusyLabel>{user.name}</BusyLabel>
            </NameCell>
            <BusynessCell>
              <BusyBar>
                <BusyBarFill
                  style={{
                    width: `${user.value * 10}%`,
                    backgroundColor: getBusyColor(user.value),
                  }}
                />
              </BusyBar>
              <BusyValue>{user.value}/10</BusyValue>
            </BusynessCell>
            <ProjectsCell>
                <ProjectsList>
                    {user.projects.map((project, index) => (
                        <ProjectChip key={index}>{project.name}</ProjectChip>
                    ))}
                </ProjectsList>
            </ProjectsCell>
        </TableRow>
    );
}

export default ProjectManagementItem;


