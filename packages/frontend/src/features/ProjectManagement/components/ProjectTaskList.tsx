import { useState, useEffect } from 'react';
import { Project, Task } from '../types';

import {DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
  } from '@dnd-kit/sortable';
  import { SortableItem } from './SortableItem';
  

interface ProjectTaskListProps {
    project: Project
}

export const ProjectTaskList = ({project}: ProjectTaskListProps) => {
    const [todo, setTodo] = useState<Task[]>([]);
    const [done, setDone] = useState<Task[]>([]);

    useEffect(() => {

    }, []);
}
