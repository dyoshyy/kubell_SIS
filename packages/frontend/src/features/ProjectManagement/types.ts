export enum TaskState {
    Todo,
    Done
}

export interface Task {
    name: string,
    state: TaskState
}

export interface Project {
<<<<<<< HEAD
    id: string,
=======
>>>>>>> 34e9f28b1c2051cfa482c05106c79b647a112109
    name: string,
    tasks: Task[]
}

export interface User {
    id: number,
    name: string,
    value: number,
    projects: Project[]
}
