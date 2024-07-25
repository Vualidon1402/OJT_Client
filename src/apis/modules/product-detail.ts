import ProductDetail from "@/pages/admin/pages/product-manager/components/product-detail/ProductDetail"
import axios from "axios"

export const productDetailApi = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/product-detail/findAll`)
    },
    async addProductDetail(data: ProductDetail) {
        return await axios.post(`${import.meta.env.VITE_SV}/product-detail/add`, data)
    },
    async updateProductDetail(data: ProductDetail) {
        return await axios.put(`${import.meta.env.VITE_SV}/product-detail/update`, data)
    },
    async deleteProductDetail(id: number) {
        return await axios.delete(`${import.meta.env.VITE_SV}/product-detail/delete/${id}`)
    },
    async getProductDetailByProductId(id: number) {
        return await axios.get(`${import.meta.env.VITE_SV}/product-detail/findByProductId/${id}`)
    },
    async getProductDetailById(id: number) {
        return await axios.get(`${import.meta.env.VITE_SV}/product-detail/findById/${id}`)
    }
}