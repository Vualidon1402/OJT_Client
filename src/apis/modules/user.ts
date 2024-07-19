import axios from "axios";


export const userApi = {
  findAll: () => {
    return axios.get(`${import.meta.env.VITE_SV}/users/findAll`);
  },
  updateStatus: (id: number) => {
   
    return axios.put(`${import.meta.env.VITE_SV}/users/update/${id}`);
  }
};