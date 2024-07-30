import React, { useState, useEffect } from "react";
import "./FlashSales.scss";
import { ProductModel } from "@/store/slices/product.slice";
import apis from "@/apis";
import { useNavigate } from "react-router-dom";

const FlashSales: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const navigate = useNavigate();

  useEffect(() => {
    apis.product.findProductHaveDiscount().then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flash-sales">
      <div className="flash-sales-header">
        <div className="title-and-timer">
          <h2>Today's</h2>
          <h1>Flash Sales</h1>
          <div className="timer">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="time-unit">
                <span className="number">{String(value).padStart(2, "0")}</span>
                <span className="label">
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="navigation">
          <button className="nav-button">←</button>
          <button className="nav-button">→</button>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.productName} />
              <span className="discount">
                -{product.productDetails[0].discount}%
              </span>
              <button className="favorite-button">♡</button>
              <button className="quick-view-button">👁</button>
              <button className="add-to-cart" onClick={()=>{
                navigate(`/product-details/${product.id}`, { state: { product } });
              }}>See Details</button>
            </div>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <div className="price">
                <span className="current-price">${product.productDetails[0]?.discountPrice}</span>
                <span className="original-price">${product.productDetails[0]?.unitPrice}</span>
              </div>
              <div className="rating">
                <div>
                  <span>⭐⭐⭐⭐⭐</span>
                  <br />
                  <span>5.0 (23)</span>
                </div>
                <div className="favorite-button">
                  {/* <button
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {isFavorite ? '♥' : '♡'}
                  </button> */}
                </div>
              </div>
              {/* <div className="rating">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
                <span className="review-count">({product.reviewCount})</span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All Products</button>
    </div>
  );
};

export default FlashSales;