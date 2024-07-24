import { Product } from "@/pages/admin/pages/product-manager/interface";
import axios from "axios";


export const productApi = {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV}/product/findAll`)
    },
    addProduct :async (data: Product) =>{
        return await axios.post(`${import.meta.env.VITE_SV}/product/add`, data)
    },
}