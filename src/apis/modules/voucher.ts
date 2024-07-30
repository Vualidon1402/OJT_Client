import { ApplyVoucher, VoucherUpdate } from "@/store/slices/voucher.slice";
import axios from "axios";

export const vouchertApi = {
  vouchers: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/vouchers`);
  },
  addVoucher: async (voucher: VoucherUpdate) => {
    return await axios.post(`${import.meta.env.VITE_SV}/vouchers`, voucher);
  },
  deleteVoucher: async (id: number) => {
    return await axios.delete(`${import.meta.env.VITE_SV}/vouchers/${id}`);
  },
  updateVoucher: async (id: number, voucher: VoucherUpdate) => {
    return await axios.put(
      `${import.meta.env.VITE_SV}/vouchers/${id}`,
      voucher
    );
  },
  applyVoucher: async (code: ApplyVoucher) => {
    return await axios.post(`${import.meta.env.VITE_SV}/payments`, 
      code,
      );
  },
};
