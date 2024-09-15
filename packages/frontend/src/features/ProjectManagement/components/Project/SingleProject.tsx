import styled from 'styled-components';
import { BORDER_COLOR, LAYER_1, LAYER_2, TEXT_PRIMARY } from '../../../../styles/color';
import { gutterBy } from '../../../../styles/spaces';
import { FONTSIZE_HEADING, FONTWEIGHT_IMPORTANT } from '../../../../styles/typography';
import { TextButton } from '../../../../ui';
import { Project } from '../../types';
import Details from './ProjectDetails';
import ChatButtons from './ProjectGroupchatButton';
import { ProjectTaskList } from './ProjectTaskList';

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${LAYER_1};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Caption = styled.h2`
  font-size: ${FONTSIZE_HEADING};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  color: ${TEXT_PRIMARY};
  margin: ${gutterBy(3)} ${gutterBy(3)} ${gutterBy(2)};
  padding-bottom: ${gutterBy(2)};
  border-bottom: 1px solid ${BORDER_COLOR};
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0 ${gutterBy(3)};
  overflow: hidden;
`;

const TaskListContainer = styled.div`
  flex: 2;
  margin-right: ${gutterBy(3)};
  overflow-y: auto;
`;

const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${LAYER_2};
  border-radius: 8px;
  padding: ${gutterBy(2)};
`;

const ActionButtonContainer = styled.div`
  padding: ${gutterBy(2)};
  background-color: ${LAYER_2};
  border-top: 1px solid ${BORDER_COLOR};
  text-align: right;
`;

export const SingleProject = ({ project, onClose }: Props) => {
  return (
    <ProjectContainer>
      <Caption>{project.name}</Caption>
      <ContentContainer>
        <TaskListContainer>
          <ProjectTaskList project={project} />
        </TaskListContainer>
        <SidebarContainer>
          <Details />
          <ChatButtons />
        </SidebarContainer>
      </ContentContainer>
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="閉じる" onClick={onClose} />
      </ActionButtonContainer>
    </ProjectContainer>
  );
};
