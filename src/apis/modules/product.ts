import { Product } from "@/pages/admin/pages/product-manager/interface";
import { SoundTwoTone } from "@ant-design/icons";
import axios from "axios";


export const productApi = {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV}/product/findAll`)
    },
    addProduct :async (data: Product) =>{
        return await axios.post(`${import.meta.env.VITE_SV}/product/add`, data)
    },
    getProductById: async (id: number) => {
        console.log(id)
        return await axios.get(`${import.meta.env.VITE_SV}/product/get/${id}`)
    },
    updateProduct: async (data: Product) => {
        return await axios.put(`${import.meta.env.VITE_SV}/product/update`, data)
    },
}