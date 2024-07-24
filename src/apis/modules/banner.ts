import { AddBanner, Banner } from "@/store/slices/banner.slice";
import axios from "axios";

export const bannerApi = {
  async addBanner(data: AddBanner) {
    return await axios.post(`${import.meta.env.VITE_SV}/addBanner`, data);
  },
  getAllBanner() {
    return axios.get(`${import.meta.env.VITE_SV}/getAllBanner`);
  },
  deleteBanner(id: number) {
    return axios.delete(`${import.meta.env.VITE_SV}/deleteBanner/${id}`);
  },
  updateBanner: (id: number, data: Banner) => {
    return axios.put(`${import.meta.env.VITE_SV}/updateBanner/${id}`, data);
  },
};
