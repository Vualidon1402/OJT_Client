import React, { useState } from "react";
import "./ProductDetails.scss";

interface ProductDetailsProps {
  product: {
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    images: string[];
    colors: string[];
    sizes: string[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0]);

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="thumbnail-list">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(image)}
              className={mainImage === image ? "active" : ""}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={product?.name} />
        </div>
      </div>
      <div className="product-info">
        <h1>{product?.name}</h1>
        <div className="rating">
          {/* Implement star rating component */}
          <span>
            {product?.rating} ({product?.reviewCount} Reviews)
          </span>
          {product?.inStock && <span className="in-stock">In Stock</span>}
        </div>
        <h2 className="price">${product?.price.toFixed(2)}</h2>
        <p>{product?.description}</p>
        <div className="colors">
          <span>Colours:</span>
          {product?.colors?.map((color) => (
            <button
              key={color}
              className={`color-btn ${selectedColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div className="sizes">
          <span>Size:</span>
          {product?.sizes?.map((size) => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="quantity">
          <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="buy-now">Buy Now</button>
        <button className="add-to-wishlist">♡</button>
        <div className="delivery-info">
          <div>
            <i className="icon-truck"></i>
            <span>Free Delivery</span>
            <p>Enter your postal code for Delivery Availability</p>
          </div>
          <div>
            <i className="icon-return"></i>
            <span>Return Delivery</span>
            <p>Free 30 Days Delivery Returns. Details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
