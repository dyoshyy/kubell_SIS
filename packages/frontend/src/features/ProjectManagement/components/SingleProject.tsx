import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';
import { Project } from '../types';
import Details from './ProjectDtails';
import ChatButtons from './ProjectGroupchatButton';
import { ProjectTaskList } from './ProjectTaskList';

interface Props {
  project: Project;
  onClose: () => void;
}

const Caption = styled.p`
  font-size: 30px;
  margin: ${gutterBy(2)};
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - ${gutterBy(2)} * 2);
  margin: ${gutterBy(2)};
  text-align: center;
`;

export const SingleProject = ({ project, onClose }: Props) => {
  return (
    <>
      <Caption>{project.name}</Caption>
      <div>
        <ProjectTaskList project={project}></ProjectTaskList>
        <div>
          <Details />
          <ChatButtons />
        </div>
      </div>
      <ActionButtonContainer>
        <TextButton buttontype="danger" text="閉じる" onClick={onClose} />
      </ActionButtonContainer>
    </>
  );
};
