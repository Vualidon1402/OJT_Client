import { Brand } from "@/store/slices/brand.slice"
import axios from "axios"


export const brandApi = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/brand/findAll`)
    },
    async addBrand(data: Brand) {
        return await axios.post(`${import.meta.env.VITE_SV}/brand/add`, data)
    },
    async updateBrand(data: Brand) {
        return await axios.put(`${import.meta.env.VITE_SV}/brand/update`, data)
    },
    async deleteBrand(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/brand/delete/${id}`)
    }
}