import axios from "axios";


export const userApi = {
  findAll: () => {
    return axios.get(`${import.meta.env.VITE_SV}/users/findAll`);
  },
};