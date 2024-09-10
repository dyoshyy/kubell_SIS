export enum TaskState {
    Todo,
    Done
}

export interface Task {
    name: string,
    state: TaskState
}

export interface Project {
    id: string,
    name: string,
    tasks: Task[]
}

export interface User {
    id: number,
    name: string,
    value: number,
    projects: Project[]
}
