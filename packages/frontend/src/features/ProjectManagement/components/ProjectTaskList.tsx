import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BORDER_COLOR,
  LAYER_1,
  LAYER_2,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '../../../styles/color';
import { gutterBy } from '../../../styles/spaces';
import { FONTSIZE_PARAGRAPH, FONTWEIGHT_IMPORTANT } from '../../../styles/typography';
import { Project, Task, TaskState } from '../types';

interface ProjectTaskListProps {
  project: Project;
}

interface List {
  id: string;
  items: Task[];
}

const ListContainerWrapper = styled.div`
  display: flex;
  gap: ${gutterBy(4)}; /* Adjust the spacing between lists */
`;

const SingleListContainer = styled.div`
  flex: 1;
  padding: ${gutterBy(4)};
  border: 1px solid ${BORDER_COLOR};
  border-radius: 8px;
  background-color: ${LAYER_1};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.h3`
  font-size: ${FONTSIZE_PARAGRAPH};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  color: ${TEXT_PRIMARY};
  margin-bottom: ${gutterBy(2)};
`;

const TaskItem = styled.li`
  padding: ${gutterBy(2)};
  background-color: ${LAYER_2};
  border-radius: 4px;
  color: ${TEXT_PRIMARY};
  font-size: ${FONTSIZE_PARAGRAPH};
  margin-bottom: ${gutterBy(2)};
  cursor: grab;

  &:hover {
    background-color: ${LAYER_1};
  }
`;

export const ProjectTaskList = ({ project }: ProjectTaskListProps) => {
  const [todoList, setTodoList] = useState<List | null>(null);
  const [doneList, setDoneList] = useState<List | null>(null);

  useEffect(() => {
    setTodoList({ id: 'Todo', items: project.tasks.filter((task) => task.state === TaskState.Todo) });
    setDoneList({ id: 'Done', items: project.tasks.filter((task) => task.state === TaskState.Done) });
  }, [project.tasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <ListContainerWrapper>
        <SingleListContainer>
          <ListTitle>Todo</ListTitle>
          <SortableContext items={todoList?.items.map((item) => item.name) || []} strategy={verticalListSortingStrategy}>
            <ListContainer list={todoList || { id: '', items: [] }} />
          </SortableContext>
        </SingleListContainer>

        <SingleListContainer>
          <ListTitle>Done</ListTitle>
          <SortableContext items={doneList?.items.map((item) => item.name) || []} strategy={verticalListSortingStrategy}>
            <ListContainer list={doneList || { id: '', items: [] }} />
          </SortableContext>
        </SingleListContainer>
      </ListContainerWrapper>

      <DragOverlay>{/* Add any overlay content here */}</DragOverlay>
    </DndContext>
  );
};

interface ListContainerProps {
  list: List;
}

const ListContainer = ({ list }: ListContainerProps) => {
  return (
    <div>
      <ul>
        {list.items.map((task) => (
          <SortableItem key={task.name} id={task.name} name={task.name} />
        ))}
      </ul>
    </div>
  );
};

interface SortableItemProps {
  id: string;
  name: string;
}

const SortableItem = ({ id, name }: SortableItemProps) => {
  return (
    <TaskItem id={id}>
      <span style={{ color: TEXT_SECONDARY, marginRight: gutterBy(2) }}>{id}</span>
      {name}
    </TaskItem>
  );
};
