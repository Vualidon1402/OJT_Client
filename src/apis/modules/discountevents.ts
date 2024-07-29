
import { DiscountEvent, DiscountEventAdd } from "@/store/slices/discountevent.slice";
import axios from "axios";

export const discountApi = {
  discount: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/discount-events`);
  },
  adddiscount: async (discount: DiscountEventAdd) => {
    return await axios.post(
      `${import.meta.env.VITE_SV}/discount-events`,
      discount
    );
  },
  deleteDiscountEvent: async (id: number) => {
    return await axios.delete(
      `${import.meta.env.VITE_SV}/discount-events/${id}`
    );
  },
  updateDiscountEvent: async (id: number, discount: DiscountEvent) => {
    return await axios.put(
      `${import.meta.env.VITE_SV}/discount-events/${id}`,
      discount
    );
  },
};
