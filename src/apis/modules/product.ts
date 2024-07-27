import { Product } from "@/pages/admin/pages/product-manager/interface";
import axios from "axios";


export const productApi = {
  findAll: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/product/findAll`);
  },
  addProduct: async (data: Product) => {
    return await axios.post(`${import.meta.env.VITE_SV}/product/add`, data);
  },
  getProductById: async (id: number) => {
    return await axios.get(`${import.meta.env.VITE_SV}/product/get/${id}`);
  },
  updateProduct: async (data: Product) => {
    return await axios.put(`${import.meta.env.VITE_SV}/product/update`, data);
  },
  deleteProduct: async (id: number) => {
    return await axios.delete(
      `${import.meta.env.VITE_SV}/product/delete/${id}`
    );
  },
  sortProductByStatus: async (status: boolean, page: number, size: number) => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/product/getByStatus/${status}/${page}/${size}`
    );
  },
  searchProduct: async (name: string) => {
    return await axios.get(`${import.meta.env.VITE_SV}/product/search/${name}`);
  },
  paginationProduct: async (page: number, size: number) => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/product/pagination/${page}/${size}`
    );
  },
  getTop8Product: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/product/getTop8`);
  },
  getProductByCategory: async (categoryId: number | null) => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/product/getByCategory/${categoryId}`
    );
  },
  findProductHaveDiscount: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/product/discount`)
}
};
