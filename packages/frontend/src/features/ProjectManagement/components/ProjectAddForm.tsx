import { useState } from 'react';
import styled from "styled-components";
import { TextButton } from "ui";

interface ProjectAddFormProps {
    handleCreateProject: (projectName: string, leaderName: string) => void
}

const ProjectAddFormContainer = styled.div`
    width: 100%;

`   
export const ProjectAddForm = ({handleCreateProject}: ProjectAddFormProps) => {
    const [projectName, setProjectName] = useState<string|null>(null);
    const [leaderName, setLeaderName] = useState<string|null>(null);

    return (
        <ProjectAddFormContainer>
            <form>
                <label htmlFor="project_name">プロジェクト名: </label>
                <input type="text" id="project_name" onChange={(e) => {setProjectName(e.target.value);} }/>
                <label htmlFor="leader_name">主担当名: </label>
                <input type="text" id="leader_name" onChange={(e) => {setLeaderName(e.target.value);} }/>
                <TextButton buttonType="primary" text="作成" onClick={() => {
                    if(projectName && leaderName){
                        handleCreateProject(projectName, leaderName);
                    }
                }}/>
            </form>
        </ProjectAddFormContainer>
    )
}
