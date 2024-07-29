import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetails.scss";
import { ProductModel } from "@/store/slices/product.slice";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const { product } = location.state as { product: ProductModel };

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0].src);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (productDetailId) => {
    setSelectedOption(productDetailId);
  };
  return (
    <div className="product-details">
      <div className="product-images">
        <div className="thumbnail-list">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(image.src)}
              className={mainImage === image.src ? "active" : ""}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={product?.productName ?? 'Product Image'} />
        </div>
      </div>
      <div className="product-info">
        <h1>{product?.productName}</h1>
        <div className="rating">
          <span>
            {product?.rating} ({product?.reviewCount} Reviews)
          </span>
        </div>
        <div className="option">
      {product.productDetails.map((productDetail, index) => (
        <button
          key={index}
          className={`btn btn-primary ${selectedOption === productDetail.id ? 'selected' : ''}`}
          onClick={() => handleSelect(productDetail.id)}
        >
          <img src={productDetail.image} alt={productDetail.color.colorName} />
          <div className="details">
            <div className="product-name">{productDetail.productDetailName}</div>
            <div className="color-name">{productDetail.color.colorName}</div>
            <div className="config-name">{productDetail.config.configName}</div>
            <div className="price">{productDetail.discountPrice.toLocaleString()}đ</div>
            <div className="status">{productDetail.status ? "Còn hàng" : "Hết hàng"}</div>
          </div>
        </button>
      ))}
    </div>
        <p>{product?.description}</p>
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