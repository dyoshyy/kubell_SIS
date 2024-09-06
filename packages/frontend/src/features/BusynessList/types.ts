export interface Project {
    name: string
}

export interface User {
    id: number,
    name: string,
    value: number,
    projects: Project[]
}
