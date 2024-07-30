/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./ShoppingCart.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";

import apis from "@/apis";
import { ApplyVoucher } from "@/store/slices/voucher.slice";
import { showToast } from "@/util/toast";
import { cartAction } from "@/store/slices/cart.slice";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();

  const cartStore = useSelector((store: StoreType) => store.cartStore.data);

  const [couponCode, setCouponCode] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | undefined>(0);
  const [totalAmounts, setTotalAmounts] = useState<number | undefined>(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  useEffect(() => {
    const calculatedTotal =
      cartStore?.reduce((total, item) => {
        return total + item.productDetail.discountPrice * item.quantity;
      }, 0) || 0;
    setTotalAmounts(calculatedTotal);
    setTotalAmount(calculatedTotal); // Thêm dòng này
  }, [cartStore]);

  const handleApplyCoupon = async () => {
    const voucher: ApplyVoucher = {
      voucherCode: couponCode,
      totalAmount: totalAmount,
    };

    try {
      const result = await apis.voucher.applyVoucher(voucher);
      if (result && result.data) {
        const discountAmount = result.data;
        setVoucherDiscount(discountAmount);
        setTotalAmount((prevTotal: any) =>
          Math.max(0, prevTotal - discountAmount)
        );
      } else {
        alert("Invalid coupon code");
      }
    } catch (error: any) {
      console.error("Error applying voucher:", error);
      showToast.error(error.response.data);
    }
  };

  const handleUpdateQuantity = async(itemId: number, newQuantity: number) => {
   
    if (newQuantity < 1) return;

    // const res = await apis.cart.increaseQuantity(itemId, newQuantity);

    dispatch(cartAction.updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const newQuantitys = useSelector((state) =>
    state?.cartStore.data.map((item: any) => item.quantity)
  );
  const id = useSelector((state) =>
    state?.cartStore.data.map((item: any) => item.id)
  );
 const firstId = id[0];
  const firstQuantity = newQuantitys[0];
  
  const handleProceedToCheckout = async () => {
    const data = {
      id: firstId,
      quantity: firstQuantity,
    };
    console.log("data", data);
    try{
      const res = await apis.cart.updateCartItem(data);
      console.log("res", res.data);
      window.location.href = "/checkout";
    }catch(error:any){
      console.error("Error updating cart item:", error);
      showToast.error(error.response.data);
    }
   
    // window.location.href = "/checkout";
  };

  return (
    <div className="shopping-cart">
      <div id="fui-toast"></div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartStore?.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.productDetail.image}
                  alt={item.productDetail.productDetailName}
                />
                <span>{item.productDetail.productDetailName}</span>
              </td>
              <td>{item.productDetail.discountPrice.toLocaleString()}đ</td>
              <td>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                {(
                  item.productDetail.discountPrice * item.quantity
                ).toLocaleString()}
                đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={handleApplyCoupon}>Apply Coupon</button>
        </div>
        <div className="cart-total">
          <h3>Cart Total</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span> {totalAmounts?.toLocaleString()}đ</span>
          </div>
          <div className="total-row">
            <span>Voucher:</span>
            <span>{voucherDiscount?.toLocaleString()}đ</span>
          </div>
          <div className="total-row">
            <span>Total:</span>
            <span>{totalAmount?.toLocaleString()}đ</span>
          </div>
          <button
            className="proceed-to-checkout"
            onClick={handleProceedToCheckout}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
