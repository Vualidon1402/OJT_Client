import React, { useEffect, useState } from 'react'
import "../../product/ProductList.scss";
import { useParams } from 'react-router-dom';
import apis from '@/apis';
import { ProductModel } from '@/store/slices/product.slice';

export default function ProductDetails() {
    
    const [products, setProducts] = React.useState<ProductModel[]>([]);
    const { id } = useParams();

    useEffect(() => {
      const fetchProducts = async () => {
        if (id !== undefined) {
          try {
            const numericId = parseInt(id, 10);
            if (!isNaN(numericId)) {
              const response = await apis.product.getProductByCategory(
                numericId
              );
              console.log(response.data);
             setProducts(response.data);
            } else {
              console.error("Invalid ID");
            }
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        }
      };

      fetchProducts();
    }, [id]);

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
      </div>
    </>
  );
}
