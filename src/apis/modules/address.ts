import { Address } from "@/store/slices/address.slice";
import axios from "axios"

export const addressApi = {
  async addressAll(data: Address) {
    return await axios.put(`${import.meta.env.VITE_SV}/address/update`, data);
  },
};