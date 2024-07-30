import { addToCart, CartItemData } from "@/store/slices/cart.slice";
import axios from "axios"


export const cartApi = {
  async addToCart(data: addToCart) {
    return await axios.post(`${import.meta.env.VITE_SV}/cart/add`, data);
  },
  getCartItem: async (id: number | undefined) => {
    return await axios.get(`${import.meta.env.VITE_SV}/cart/user/${id}`);
  },
  updateCartItem: async (data:CartItemData
  ) => {
    return await axios.put(`${import.meta.env.VITE_SV}/cart/update`, data);
  },
  
};