import { Color } from "@/store/slices/color.slice"
import axios from "axios"



export const colorApi = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/color/findAll`)
    },
    async addColor(data: Color) {
        return await axios.post(`${import.meta.env.VITE_SV}/color/add`, data)
    },
    async updateColor(data: Color) {
        return await axios.put(`${import.meta.env.VITE_SV}/color/update`, data)
    },
    async deleteColor(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/color/delete/${id}`)
    }
}