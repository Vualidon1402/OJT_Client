import React, { useState } from "react";
import "./BillingDetails.scss";

interface Product {
  name: string;
  price: number;
  image: string;
}

const BillingDetails: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couponCode, setCouponCode] = useState("");

  const products: Product[] = [
    { name: "LCD Monitor", price: 650, image: "/path/to/lcd-monitor.png" },
    { name: "H1 Gamepad", price: 1100, image: "/path/to/h1-gamepad.png" },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const shipping = "Free";
  const total = subtotal;

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
    // Implement order placement logic here
    console.log("Placing order with billing info:", billingInfo);
  };

  return (
    <div className="billing-details">
      <h1>Billing Details</h1>
      <div className="billing-form">
        <div className="form-section">
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={billingInfo.firstName}
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
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <span>{product.name}</span>
              <span>${product.price}</span>
            </div>
          ))}
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            <span>{shipping}</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>${total}</span>
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
            <img src="/path/to/bank-icon.png" alt="Bank" />
            <img src="/path/to/visa-icon.png" alt="Visa" />
            <img src="/path/to/mastercard-icon.png" alt="Mastercard" />
            <img src="/path/to/gpay-icon.png" alt="Google Pay" />
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
