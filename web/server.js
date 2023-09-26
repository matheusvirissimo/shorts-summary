import axios from "axios" // conecta o back com o front

export const server = axios.create({
    baseURL: "http://localhost:3333"
})