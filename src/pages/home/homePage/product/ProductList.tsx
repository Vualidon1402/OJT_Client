import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import { ProductModel } from "@/store/slices/product.slice";
import apis from "@/apis";

export default function ProductList() {
  const [products, setProducts] = React.useState<ProductModel[]>([]);
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await apis.product.getTop8Product();

        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
  };

  return (
    <>
      <div className="product-list">
        <div className="product-list-header">
          <h2>Explore Our Products</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.productName} />
                <button className="add-to-cart">See Details</button>
              </div>
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p className="price">
                  {product.productDetails
                    .reduce((acc, curr) => {
                      return acc.unitPrice > curr.unitPrice ? acc : curr;
                    })
                    .unitPrice.toLocaleString()}
                  đ
                </p>
                <div className="rating">
                  <div>
                    <span>⭐⭐⭐⭐⭐</span>
                    <br />
                    <span>5.0 (23)</span>
                  </div>
                  <div className="favorite-button">
                    <button
                      className={`favorite-button ${
                        isFavorite ? "active" : ""
                      }`}
                      onClick={toggleFavorite}
                    >
                      {isFavorite ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-button">View All Products</button>
      </div>
    </>
  );
}
