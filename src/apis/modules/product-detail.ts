import { ProductDetail } from "@/pages/admin/pages/product-manager/interface"
import axios from "axios"

export const category = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/product-detail/findAll`)
    },
    async addCategory(data: ProductDetail) {
        return await axios.post(`${import.meta.env.VITE_SV}/product-detail/add`, data)
    },
    async updateCategory(data: ProductDetail) {
        return await axios.put(`${import.meta.env.VITE_SV}/product-detail/update`, data)
    },
    async deleteCategory(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/product-detail/delete/${id}`)
    }
}