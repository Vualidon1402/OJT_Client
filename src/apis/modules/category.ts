import axios from "axios"

export const category = {
    async findAll() {
        return await axios.get(`${import.meta.env.VITE_SV}/category`)
    }
}