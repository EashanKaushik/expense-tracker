import create from "./http-service"

export interface Users {
    name: string,
    id: number
}

export default create('/users')