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
      name: "Website Redesign",
      tasks: [
        { name: "Create wireframes", state: TaskState.Todo },
        { name: "Design homepage mockup", state: TaskState.Done },
        { name: "Develop responsive layout", state: TaskState.Todo },
      ]
    },
    {
      name: "Mobile App Development",
      tasks: [
        { name: "Finalize app architecture", state: TaskState.Done },
        { name: "Implement user authentication", state: TaskState.Todo },
        { name: "Design UI components", state: TaskState.Todo },
      ]
    },
    {
      name: "Marketing Campaign",
      tasks: [
        { name: "Define target audience", state: TaskState.Done },
        { name: "Create social media content", state: TaskState.Done },
      ]
    },
    {
      name: "Customer Support System",
      tasks: [
        { name: "Set up ticketing software", state: TaskState.Todo },
        { name: "Train support team", state: TaskState.Todo },
      ]
    },
    {
      name: "Product Launch",
      tasks: [
        { name: "Finalize product features", state: TaskState.Done },
        { name: "Prepare press release", state: TaskState.Todo },
        { name: "Schedule launch event", state: TaskState.Todo },
        { name: "Update website with new product", state: TaskState.Done },
      ]
    },
    {
      name: "Office Relocation",
      tasks: [
        { name: "Find new office space", state: TaskState.Todo },
        { name: "Plan office layout", state: TaskState.Todo },
      ]
    },
    {
      name: "Annual Financial Audit",
      tasks: [
        { name: "Gather financial documents", state: TaskState.Done },
        { name: "Meet with auditors", state: TaskState.Done },
      ]
    },
    {
      name: "Employee Training Program",
      tasks: [
        { name: "Identify training needs", state: TaskState.Todo },
        { name: "Develop training materials", state: TaskState.Todo },
        { name: "Schedule training sessions", state: TaskState.Done },
      ]
    },
    {
      name: "Inventory Management System",
      tasks: [
        { name: "Implement barcode scanning", state: TaskState.Done },
        { name: "Integrate with existing ERP", state: TaskState.Todo },
      ]
    },
    {
      name: "Cybersecurity Upgrade",
      tasks: [
        { name: "Conduct security audit", state: TaskState.Todo },
        { name: "Implement two-factor authentication", state: TaskState.Done },
      ]
    },
  ]
  
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
        <TextButton buttontype="danger" text="閉じる" onClick={onClose} />
      </ActionButtonContainer>
    </>
  );
};
