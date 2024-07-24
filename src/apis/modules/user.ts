import { Login, Register, Roles, Update } from "@/store/slices/user.slice";
import axios from "axios";

export const userApi = {
  findAll: () => {
    return axios.get(`${import.meta.env.VITE_SV}/users/findAll`);
  },
  updateStatus: (id: number) => {
    return axios.put(`${import.meta.env.VITE_SV}/users/update/${id}`);
  },
  findByUserName: (userName: string) => {
    return axios.get(
      `${import.meta.env.VITE_SV}/users/findByUserName/${userName}`
    );
  },
  sortUser: (sort: string) => {
    return axios.get(`${import.meta.env.VITE_SV}/users/sort?sortType=${sort}`);
  },
  findUsers: (page: number, size: number) => {
    return axios.get(
      `${import.meta.env.VITE_SV}/users/find?page=${page}&size=${size}`
    );
  },
  updateRole: (id: number, role: Roles[]) => {
    console.log(role, id);
    return axios.put(`${import.meta.env.VITE_SV}/users/updateRole/${id}`, role);
  },
  register: (user: Register) => {
    return axios.post(`${import.meta.env.VITE_SV}/users/register`, user);
  },
  login: (user: Login) => {
    return axios.post(`${import.meta.env.VITE_SV}/users/login`, user);
  },
  authen: () => {
    return axios.post(`${import.meta.env.VITE_SV}/users/authen`, {});
  },
  changePassword: (
    id: number | undefined,
    password: {
      oldPassword: string;
      newPassword: string;
    }
  ) => {
    return axios.put(
      `${import.meta.env.VITE_SV}/users/changePassword/${id}`,
      password
    );
  },
  updateProfile: (id: number | undefined, data: Update) => {
    return axios.put(`${import.meta.env.VITE_SV}/users/updateUser/${id}`, data);
  },
};
