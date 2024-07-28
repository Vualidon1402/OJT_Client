import React, { useState } from "react";
import "./ShoppingCart.scss";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "/path/to/gamepad-image.jpg",
    },
  ]);
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = "Free";
  const total = subtotal;

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    console.log("Applying coupon:", couponCode);
  };

  const handleUpdateCart = () => {
    // Implement cart update logic here
    console.log("Updating cart");
  };

  const handleProceedToCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout");
  };

  return (
    <div className="shopping-cart">
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
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </td>
              <td>${item.price}</td>
              <td>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-actions">
        <button className="return-to-shop">Return To Shop</button>
        <button className="update-cart" onClick={handleUpdateCart}>
          Update Cart
        </button>
      </div>

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
            <span>${subtotal}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>{shipping}</span>
          </div>
          <div className="total-row">
            <span>Total:</span>
            <span>${total}</span>
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
