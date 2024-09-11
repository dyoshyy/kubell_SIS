import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';
import { TaskState } from "../types";
<<<<<<< HEAD
import ProjectManagementItem from './ProjectManagementItem';
import { IDCell, NameCell, Table, TableContainer, TableRow } from './Table';
=======
<<<<<<< HEAD
import ProjectManagementItem from './ProjectManagementItem';
import { IDCell, NameCell, Table, TableContainer, TableRow } from './Table';
=======
import { ProjectManagementItem, TableCell, TableRow } from './ProjectManagementItem';
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
>>>>>>> 7b07093525bc704015ecc68e8b3a18b2071af78e

interface Props {
  onClose: () => void;
}

const Caption = styled.p`
  font-size: 30px;
  margin: ${gutterBy(2)};
`;

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const TableContainer = styled.div`
  max-height: 480px;
  overflow-y: auto;
  margin: ${gutterBy(2)};
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
>>>>>>> 7b07093525bc704015ecc68e8b3a18b2071af78e
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7b07093525bc704015ecc68e8b3a18b2071af78e
        id: "1",
        name: "顧客A税務申告",
        tasks: [
            { name: "領収書の整理", state: TaskState.Todo },
            { name: "経費の計上", state: TaskState.Todo },
            { name: "申告書の作成", state: TaskState.Todo },
            { name: "申告書の確認", state: TaskState.Done },
            { name: "納税額の確認", state: TaskState.Todo },
            { name: "税務署への申請", state: TaskState.Todo }
        ]
    },
    {
        id: "2",
        name: "顧客B決算業務",
        tasks: [
            { name: "売上の確認", state: TaskState.Todo },
            { name: "仕入れの確認", state: TaskState.Done },
            { name: "決算書の作成", state: TaskState.Todo },
            { name: "納税額の計算", state: TaskState.Todo },
            { name: "顧客への報告書作成", state: TaskState.Todo },
            { name: "最終確認と署名", state: TaskState.Todo }
        ]
    },
    {
        id: "3",
        name: "顧客Cの給与計算",
        tasks: [
            { name: "給与データの収集", state: TaskState.Done },
            { name: "給与明細の作成", state: TaskState.Todo },
            { name: "給与振込手続き", state: TaskState.Todo },
            { name: "源泉徴収税の計算", state: TaskState.Todo },
            { name: "労働保険の申告", state: TaskState.Todo }
        ]
    },
    {
        id: "4",
        name: "顧客Dの相続税申告",
        tasks: [
            { name: "資産評価の確認", state: TaskState.Todo },
            { name: "遺産分割協議書の作成", state: TaskState.Todo },
            { name: "相続税申告書の作成", state: TaskState.Todo },
            { name: "相続税の計算", state: TaskState.Todo },
            { name: "申告書の提出", state: TaskState.Todo },
            { name: "税務調査の対応", state: TaskState.Todo }
        ]
    },
    {
        id: "5",
        name: "顧客Eの年末調整",
        tasks: [
            { name: "扶養控除申告書の確認", state: TaskState.Todo },
            { name: "保険料控除の確認", state: TaskState.Done },
            { name: "年末調整計算書の作成", state: TaskState.Todo },
            { name: "源泉徴収票の作成", state: TaskState.Todo },
            { name: "従業員への配布", state: TaskState.Todo }
        ]
    },
    {
        id: "6",
        name: "顧客Fの法人設立支援",
        tasks: [
            { name: "定款の作成", state: TaskState.Done },
            { name: "法務局への登記申請", state: TaskState.Todo },
            { name: "税務署への届出書作成", state: TaskState.Todo },
            { name: "銀行口座の開設支援", state: TaskState.Todo },
            { name: "社会保険の手続き", state: TaskState.Todo }
        ]
    },
    {
        id: "7",
        name: "顧客Gの資金調達支援",
        tasks: [
            { name: "事業計画書の作成", state: TaskState.Todo },
            { name: "銀行との打ち合わせ", state: TaskState.Done },
            { name: "融資申込書の作成", state: TaskState.Todo },
            { name: "融資条件の交渉", state: TaskState.Todo },
            { name: "契約書の確認", state: TaskState.Todo }
        ]
    }
];
=======
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
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
  
  return (
    <>
      <Caption>プロジェクト一覧</Caption>
      <TableContainer>
        <Table>
          <TableRow>
<<<<<<< HEAD
            <IDCell>ID</IDCell>
            <NameCell>名前</NameCell>
=======
<<<<<<< HEAD
            <IDCell>ID</IDCell>
            <NameCell>名前</NameCell>
=======
            <TableCell>名前</TableCell>
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
>>>>>>> 7b07093525bc704015ecc68e8b3a18b2071af78e
          </TableRow>
          {ProjectItems.map((item) => (
            <ProjectManagementItem project={item} />
          ))}
        </Table>
      </TableContainer>
      <ActionButtonContainer>
<<<<<<< HEAD
        <TextButton buttontype="danger" text="閉じる" onClick={onClose} />
=======
<<<<<<< HEAD
        <TextButton buttontype="danger" text="閉じる" onClick={onClose} />
=======
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
>>>>>>> 7b07093525bc704015ecc68e8b3a18b2071af78e
      </ActionButtonContainer>
    </>
  );
};
