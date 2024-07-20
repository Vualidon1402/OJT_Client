import { Category } from "@/store/slices/category.slice"
import axios from "axios"

export const category = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/category/findAll`)
    },
    async addCategory(data: Category) {
        return await axios.post(`${import.meta.env.VITE_SV}/category/add`, data)
    },
    async updateCategory(data: Category) {
        return await axios.put(`${import.meta.env.VITE_SV}/category/update`, data)
    },
    async deleteCategory(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/category/delete/${id}`)
    }
}