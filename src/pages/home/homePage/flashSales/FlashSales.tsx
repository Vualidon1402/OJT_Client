import React, { useState, useEffect } from "react";
import "./FlashSales.scss";

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount: number;
}

const FlashSales: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

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

  const products: Product[] = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      currentPrice: 120,
      originalPrice: 160,
      image: "/path/to/gamepad-image.jpg",
      rating: 5,
      reviewCount: 88,
      discount: 40,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      currentPrice: 960,
      originalPrice: 1160,
      image: "/path/to/keyboard-image.jpg",
      rating: 4,
      reviewCount: 75,
      discount: 35,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      currentPrice: 370,
      originalPrice: 400,
      image: "/path/to/monitor-image.jpg",
      rating: 5,
      reviewCount: 99,
      discount: 30,
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      currentPrice: 375,
      originalPrice: 400,
      image: "/path/to/chair-image.jpg",
      rating: 4.5,
      reviewCount: 99,
      discount: 25,
    },
    {
      id: 5,
      name: "S-Series Comfort Chair",
      currentPrice: 375,
      originalPrice: 400,
      image: "/path/to/another-chair-image.jpg",
      rating: 5,
      reviewCount: 99,
      discount: 25,
    },
  ];

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
              <img src={product.image} alt={product.name} />
              <span className="discount">-{product.discount}%</span>
              <button className="favorite-button">♡</button>
              <button className="quick-view-button">👁</button>
              <button className="add-to-cart">Add To Cart</button>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="price">
                <span className="current-price">${product.currentPrice}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>
              <div className="rating">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
                <span className="review-count">({product.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All Products</button>
    </div>
  );
};

export default FlashSales;
