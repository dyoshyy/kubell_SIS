import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';
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
  const busyItems = [
    { id: 1, name: "佐藤 健太", value: 3, projects: [{name:"新規顧客管理システム開発"}, {name: "レガシーシステム保守"}] },
    { id: 2, name: "鈴木 美咲", value: 5, projects: [{name:"モバイルアプリUI/UX改善"}, {name: "社内勤怠システム更新"}] },
    { id: 3, name: "高橋 隆", value: 8, projects: [{name:"AI chatbot導入"}, {name: "データ分析基盤構築"}] },
    { id: 4, name: "田中 恵子", value: 6, projects: [{name:"ECサイトリニューアル"}, {name: "顧客サポートポータル開発"}] },
    { id: 5, name: "渡辺 裕太", value: 9, projects: [{name:"クラウド移行プロジェクト"}, {name: "セキュリティ監査対応"}] },
    { id: 6, name: "伊藤 さくら", value: 4, projects: [{name:"社内文書管理システム構築"}, {name: "新人研修プログラム開発"}] },
    { id: 7, name: "山本 大輔", value: 2, projects: [{name:"IoTデバイス連携システム開発"}, {name: "ビッグデータ分析基盤構築"}] },
    { id: 8, name: "中村 優子", value: 6, projects: [{name:"顧客向けモバイルアプリ開発"}, {name: "リモートワーク支援ツール導入"}] },
    { id: 9, name: "小林 雄太", value: 1, projects: [{name:"AI予測モデル開発"}, {name: "データウェアハウス最適化"}] },
    { id: 10, name: "加藤 美穂", value: 5, projects: [{name:"社内コミュニケーションツール改善"}, {name: "採用管理システム開発"}] },
    { id: 11, name: "吉田 健一", value: 7, projects: [{name:"決済システム刷新"}, {name: "セキュリティ強化プロジェクト"}] },
    { id: 12, name: "山田 千尋", value: 6, projects: [{name:"顧客分析ダッシュボード開発"}, {name: "マーケティング自動化システム構築"}] },
    { id: 13, name: "佐々木 翔太", value: 8, projects: [{name:"次世代ERPシステム導入"}, {name: "業務プロセス自動化"}] },
  ];

  return (
    <>
      <Caption>従業員の忙しさ一覧</Caption>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell>アイコン</TableCell>
            <TableCell>名前</TableCell>
            <TableCell>忙しさ</TableCell>
            <TableCell>アサイン中のプロジェクト</TableCell>
          </TableRow>
          {busyItems.map((item) => (
            <ProjectManagementItem user={item} />
          ))}
        </Table>
      </TableContainer>
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
      </ActionButtonContainer>
    </>
  );
};
