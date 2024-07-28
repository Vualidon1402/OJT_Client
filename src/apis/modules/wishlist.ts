import axios from "axios";

export const wishListApi = {
  addWishList: async (data: {
    userId: number | undefined;
    productId: number | undefined;
  }) => {
    return await axios.post(`${import.meta.env.VITE_SV}/addWishList`, data);
  },
  getWishList: async (userId: number | undefined) => {
    return await axios.get(`${import.meta.env.VITE_SV}/getWishList/${userId}`);
  },
  deleteWishList: async (id: number | undefined) => {
    return await axios.delete(`${import.meta.env.VITE_SV}/deleteWishList/${id}`);
  },
};
