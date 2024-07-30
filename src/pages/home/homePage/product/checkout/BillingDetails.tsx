import React, { useState } from "react";
import "./BillingDetails.scss";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import apis from "@/apis";



const BillingDetails: React.FC = () => {
  const cartStore = useSelector((store: StoreType) => store.cartStore.data);
  console.log("cartStore", cartStore);

   const [billingInfo, setBillingInfo] = useState({
     userId: "",
     receiveName: "",
     streetAddress: "",
     district: "",
     townCity: "",
     province: "",
     phone: "",
     priority: false,
   });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couponCode, setCouponCode] = useState("");




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    console.log("Applying coupon:", couponCode);
  };

  const handlePlaceOrder = () => {
    
    const res = apis.address.addressAll(billingInfo);
    // Implement order placement logic here
    console.log("Placing order with billing info:", billingInfo);
  };

  const subtotal = cartStore?.reduce((acc, product) => {
    return acc + product.productDetail.discountPrice * product.quantity;
  }, 0);

  return (
    <div className="billing-details">
      <h1>Billing Details</h1>
      <div className="billing-form">
        <div className="form-section">
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={billingInfo.receiveName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={billingInfo.companyName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address*"
            value={billingInfo.streetAddress}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, floor, etc. (optional)"
            value={billingInfo.apartment}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="townCity"
            placeholder="Town/City*"
            value={billingInfo.townCity}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number*"
            value={billingInfo.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address*"
            value={billingInfo.emailAddress}
            onChange={handleInputChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="saveInfo"
              checked={billingInfo.saveInfo}
              onChange={handleInputChange}
            />
            Save this information for faster check-out next time
          </label>
        </div>
        <div className="order-summary">
          {cartStore?.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.productDetail.image} alt={product.name} />
              <span>
                Unit Price:{" "}
                {product.productDetail.discountPrice.toLocaleString()}đ
              </span>
              <span>Quantity: {product.quantity}</span>
            </div>
          ))}
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>{subtotal?.toLocaleString()}đ</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            {/* <span>{shipping}</span> */}
          </div>
          <div className="total">
            <span>Total:</span>
            <span> {subtotal?.toLocaleString()}đ</span>
          </div>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Bank
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash on delivery
            </label>
          </div>
          <div className="payment-icons">
            <img
              src="https://bidv.com.vn/wps/wcm/connect/81f9f9c1-bb6d-42a3-80b6-600a80b35b3b/17.+V%C3%AD+VNPay.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-81f9f9c1-bb6d-42a3-80b6-600a80b35b3b-omlTcDq"
              alt="Bank"
            />
            <img
              src="https://onestop.payoo.vn/img/payment/icon/zalopay.png?v=2.65"
              alt="Visa"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgI6LpG25dSVbN47hE1SeBgNiqbaPzL6nc7w&s"
              alt="Mastercard"
            />
            <img
              src="https://file.hstatic.net/1000001117/file/shopeepay_2024_a5b50829e6c645f683dc6507d8c7413b.png"
              alt="Google Pay"
            />
          </div>
          <div className="coupon">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>
          <button className="place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
