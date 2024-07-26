import React from "react";
import "./ProductList.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
}


 const products: Product[] = [
  {
    id: 1,
    name: "iPhone 12",
    price: 799,
    image: "https://via.placeholder.com/150",
    rating: 4.5,
    reviewCount: 100,
    isNew: true,
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 1299,
    image: "https://via.placeholder.com/150",
    rating: 4.8,
    reviewCount: 150,
  },
  {
    id: 3,
    name: "Apple Watch",
    price: 399,
    image: "https://via.placeholder.com/150",
    rating: 4.3,
    reviewCount: 80,
  },
  {
    id: 4,
    name: "Sony Camera",
    price: 499,
    image: "https://via.placeholder.com/150",
    rating: 4.6,
    reviewCount: 120,
  },
  {
    id: 5,
    name: "Beats Headphones",
    price: 199,
    image: "https://via.placeholder.com/150",
    rating: 4.1,
    reviewCount: 70,
  },
  {
    id: 6,
    name: "PS5",
    price: 499,
    image: "https://via.placeholder.com/150",
    rating: 4.9,
    reviewCount: 200,
  },
];



export default function ProductList() {
  return (
    <>
      return (
      <div className="product-list">
        <div className="product-list-header">
          <h2>Explore Our Products</h2>
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
                {product.isNew && <span className="new-label">New</span>}
                <button className="favorite-button">♡</button>
                <button className="quick-view-button">👁</button>
                <button className="add-to-cart">Add To Cart</button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
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
    </>
  );
}

