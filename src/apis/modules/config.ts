import { Config } from "@/store/slices/config.slice"
import axios from "axios"



export const configApi = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/config/findAll`)
    },
    async addConfig(data: Config) {
        return await axios.post(`${import.meta.env.VITE_SV}/config/add`, data)
    },
    async updateConfig(data: Config) {
        return await axios.put(`${import.meta.env.VITE_SV}/config/update`, data)
    },
    async deleteConfig(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/config/delete/${id}`)
    }
}