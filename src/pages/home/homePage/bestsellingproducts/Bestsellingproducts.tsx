import React from "react";
import "./BestSellingProducts.scss";

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
}

const BestSellingProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "The north coat",
      currentPrice: 260,
      originalPrice: 350,
      rating: 5,
      reviewCount: 65,
      image: "/path/to/north-coat.jpg",
    },
    {
      id: 2,
      name: "Gucci duffle bag",
      currentPrice: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviewCount: 65,
      image: "/path/to/gucci-bag.jpg",
    },
    {
      id: 3,
      name: "RGB liquid CPU Cooler",
      currentPrice: 160,
      originalPrice: 170,
      rating: 4,
      reviewCount: 65,
      image: "/path/to/cpu-cooler.jpg",
    },
    {
      id: 4,
      name: "Small BookShelf",
      currentPrice: 360,
      originalPrice: 360,
      rating: 5,
      reviewCount: 65,
      image: "/path/to/bookshelf.jpg",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="best-selling-products">
      <div className="header">
        <div className="title-section">
          <span className="tag">This Month</span>
          <h2>Best Selling Products</h2>
        </div>
        <button className="view-all">View All</button>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              <button className="favorite">♡</button>
              <button className="quick-view">👁</button>
            </div>
            <h3>{product.name}</h3>
            <div className="price">
              <span className="current-price">${product.currentPrice}</span>
              <span className="original-price">${product.originalPrice}</span>
            </div>
            <div className="rating">
              {renderStars(product.rating)}
              <span className="review-count">({product.reviewCount})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
