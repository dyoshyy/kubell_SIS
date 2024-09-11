export enum TaskState {
    Todo,
    Done
}

export interface Task {
    name: string,
    state: TaskState
}

export interface Project {
<<<<<<<<< Temporary merge branch 1
=========
    id: string,
>>>>>>>>> Temporary merge branch 2
    name: string,
    tasks: Task[]
}

export interface User {
    id: number,
    name: string,
    value: number,
    projects: Project[]
}
