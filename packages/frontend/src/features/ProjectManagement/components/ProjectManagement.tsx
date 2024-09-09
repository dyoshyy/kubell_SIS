import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';
import { TaskState } from "../types";
import { ProjectManagementItem, TableCell, TableRow } from './ProjectManagementItem';

interface Props {
  onClose: () => void;
}

const Caption = styled.p`
  font-size: 30px;
  margin: ${gutterBy(2)};
`;

const TableContainer = styled.div`
  max-height: 480px;
  overflow-y: auto;
  margin: ${gutterBy(2)};
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - ${gutterBy(2)} * 2);
  margin: ${gutterBy(2)};
  text-align: center;
`;

export const ProjectManagement = ({ onClose }: Props) => {
  const ProjectItems = [
    {
      name: "Project 1",
      tasks: [
          { name: "Task 1.1", state: TaskState.Todo },
          { name: "Task 1.2", state: TaskState.Done },
          { name: "Task 1.3", state: TaskState.Todo },
      ]
  },
  {
      name: "Project 2",
      tasks: [
          { name: "Task 2.1", state: TaskState.Done },
          { name: "Task 2.2", state: TaskState.Todo },
          { name: "Task 2.3", state: TaskState.Todo },
      ]
  },
  {
      name: "Project 3",
      tasks: [
          { name: "Task 3.1", state: TaskState.Done },
          { name: "Task 3.2", state: TaskState.Done },
      ]
  },
  {
      name: "Project 4",
      tasks: [
          { name: "Task 4.1", state: TaskState.Todo },
          { name: "Task 4.2", state: TaskState.Todo },
      ]
  },
  {
      name: "Project 5",
      tasks: [
          { name: "Task 5.1", state: TaskState.Done },
          { name: "Task 5.2", state: TaskState.Todo },
          { name: "Task 5.3", state: TaskState.Todo },
          { name: "Task 5.4", state: TaskState.Done },
      ]
  },
  {
      name: "Project 6",
      tasks: [
          { name: "Task 6.1", state: TaskState.Todo },
          { name: "Task 6.2", state: TaskState.Todo },
      ]
  },
  {
      name: "Project 7",
      tasks: [
          { name: "Task 7.1", state: TaskState.Done },
          { name: "Task 7.2", state: TaskState.Done },
      ]
  },
  {
      name: "Project 8",
      tasks: [
          { name: "Task 8.1", state: TaskState.Todo },
          { name: "Task 8.2", state: TaskState.Todo },
          { name: "Task 8.3", state: TaskState.Done },
      ]
  },
  {
      name: "Project 9",
      tasks: [
          { name: "Task 9.1", state: TaskState.Done },
          { name: "Task 9.2", state: TaskState.Todo },
      ]
  },
  {
      name: "Project 10",
      tasks: [
          { name: "Task 10.1", state: TaskState.Todo },
          { name: "Task 10.2", state: TaskState.Done },
      ]
  },
  ];

  return (
    <>
      <Caption>プロジェクト一覧</Caption>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell>名前</TableCell>
          </TableRow>
          {ProjectItems.map((item) => (
            <ProjectManagementItem project={item} />
          ))}
        </Table>
      </TableContainer>
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
      </ActionButtonContainer>
    </>
  );
};
