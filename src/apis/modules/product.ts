import axios from "axios";


export const productApi = {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV}/product/findAll`)
    }
}