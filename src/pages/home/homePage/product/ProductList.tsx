import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.scss";
import { ProductModel } from "@/store/slices/product.slice";
import apis from "@/apis";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";
import { wishListActions } from "@/store/slices/wishList.slice";

function ProductList() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.userStore.data);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [products, setProducts] = useState<ProductModel[]>([]);
  const navigate = useNavigate();

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

  const fetchFavorites = async () => {
    if (userStore?.id) {
      try {
        const response = await apis.wishlist.getWishList(userStore.id);
        if (response.status === 200) {
          const favoritesMap = response.data.reduce(
            (acc: Record<number, boolean>, item: any) => {
              acc[item.product.id] = true;
              return acc;
            },
            {}
          );
          setFavorites(favoritesMap);
          console.log("Wishlist items:", favoritesMap);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userStore?.id]);

  const toggleFavorite = async (id: number) => {
    if (!userStore?.id) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích");
      return;
    }
    const isFavorite = favorites[id];
    console.log("Is Favorite:", isFavorite);
    try {
      if (isFavorite) {
        await apis.wishlist.deleteWishList(userStore.id);
      } else {
        await apis.wishlist.addWishList({
          userId: userStore.id,
          productId: id,
        });
      }
      setFavorites((prev) => ({ ...prev, [id]: !isFavorite }));
      dispatch(wishListActions.add({ productId: id, isFavorite: !isFavorite }));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleSeeDetails = (product: ProductModel) => {
    navigate(`/product-details/${product.id}`, { state: { product } });
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Explore Our Products</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.productName} />
              <button
                className="add-to-cart"
                onClick={() => handleSeeDetails(product)}
              >
                See Details
              </button>
            </div>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <p className="price">
                {product.productDetails.length > 0
                  ? product.productDetails.reduce((acc, curr) =>
                      acc.discountPrice > curr.discountPrice ? acc : curr
                    ).discountPrice.toLocaleString()
                  : "N/A"}
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
                      favorites[product.id] ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites[product.id] ? "♥" : "♡"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All Products</button>
    </div>
  );
}

export default ProductList;