import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Project, Task, TaskState } from '../types';

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
  

interface ProjectTaskListProps {
    project: Project
}

interface List {
  id: string,
  items: Task[]
}

const ListContainerWrapper = styled.div`
  display: flex;
  gap: 20px; /* リスト間のスペースを指定 */
`;

const SingleListContainer = styled.div`
  flex: 1; /* リストが均等に幅を取るように */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const ProjectTaskList = ({project}: ProjectTaskListProps) => {
    const [todoList, setTodoList] = useState<List|null>(null);
    const [doneList, setDoneList] = useState<List|null>(null);

    // const [activeId, setActiveId] = useState<string|null>(null);

    useEffect(() => {
      setTodoList({id: 'todo_list', items: project.tasks.filter((task) => task.state == TaskState.Todo)});
      setDoneList({id: 'done_list', items: project.tasks.filter((task) => task.state == TaskState.Done)});
    }, []);

    const sensors = useSensors(
      useSensor(PointerSensor)
    );

    // const findListContainingItem = (id) => {
    //   if(!todoList || !doneList) return null;
    //   if(id === todoList.id) return todoList.items;
    //   if(id === doneList.id) return doneList.items;
    // };

    // const handleDragStart = (event) => {
    //   const { active } = event;
    //   setActiveId(active.id);
    // };
  
    // const handleDragEnd = (event) => {
    //   const { active, over } = event;
  
    //   if (!over) return;
  
    //   const activeListId = findListContainingItem(active.id);
    //   const overListId = findListContainingItem(over.id);
  
    //   // 同じリスト内での並び替え
    //   if (activeListId === overListId) {
    //     const updatedList = arrayMove(
    //       lists[activeListId],
    //       lists[activeListId].findIndex((item) => item.id === active.id),
    //       lists[overListId].findIndex((item) => item.id === over.id)
    //     );
    //     setLists((prev) => ({ ...prev, [activeListId]: updatedList }));
    //   } 
    //   // 異なるリスト間での移動
    //   else {
    //     const activeItem = lists[activeListId].find((item) => item.id === active.id);
    //     setLists((prev) => {
    //       return {
    //         ...prev,
    //         [activeListId]: prev[activeListId].filter((item) => item.id !== active.id),
    //         [overListId]: [...prev[overListId], activeItem],
    //       };
    //     });
    //   }
    //   setActiveId(null);
    // };

    return (
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      // onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
    >
      <ListContainerWrapper>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* 1つ目のリスト */}
          <SingleListContainer>
            <SortableContext
              items={todoList?.items.map((item) => item.name) || []}
              strategy={verticalListSortingStrategy}
            >
              <ListContainer list={todoList || {id: '', items: []}} />
            </SortableContext>
          </SingleListContainer>

          {/* 2つ目のリスト */}
          <SingleListContainer>
            <SortableContext
              items={doneList?.items.map((item) => item.name) || []}
              strategy={verticalListSortingStrategy}
            >
              <ListContainer list={doneList || {id: '', items: []}} />
            </SortableContext>
          </SingleListContainer>
        </div>
      </ListContainerWrapper>

      {/* <DragOverlay>
        {activeId ? <SortableItem id={activeId} name={activeId} /> : null}
      </DragOverlay> */}
    </DndContext>
    )
}

interface ListContainerProps {
  list: List
}

const ListContainer = ({ list }: ListContainerProps) => {
  return (
    <div>
      <h3>{list.id}</h3>
      <ul>
        {list.items.map((task) => (
          <SortableItem key={task.name} id={task.name} name={task.name} />
        ))}
      </ul>
    </div>
  );
};

interface SortableItemProps {
  id: string,
  name: string
}

// SortableItemコンポーネント
const SortableItem = ({ id, name }: SortableItemProps) => {
  return (
    <li id={id} style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px' }}>
      {name}
    </li>
  );
};
