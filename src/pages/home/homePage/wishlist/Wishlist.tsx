/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { StoreType } from "@/store";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../product/ProductList.scss";
import { wishListActions } from "@/store/slices/wishList.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import apis from "@/apis";

export default function Wishlist() {
  const userStore = useSelector((store: StoreType) => {
    return store.userStore.data;
  });
  const wishListItems = useSelector(
    (state: StoreType) => state.wistListStore.data
  );
  // const selectUser = (state: StoreType) => state.wistListStore.data;
  // const usewishList = useSelector(selectUser);
  // console.log("Wishlist items:", wishListItems);

  const dispatch = useDispatch<any>();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (userStore?.id !== undefined) {
  //       try {
  //         const response = await dispatch(
  //           wishListActions.findAllThunk(userStore.id)
  //         ).then(unwrapResult);
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       }
  //     }
  //   };

  //   fetchProducts();
  // }, [userStore?.id, dispatch]);

  const toggleFavorite = async (id: number) => {
    // Call API to update wishlist
    const response = await apis.wishlist.deleteWishList(id);
    if (response.status === 200) {
      console.log("Deleted wishlist item:", id);
      // Update the local state
      dispatch(wishListActions.delete(id));


    }else{
      console.log("Error deleting wishlist item:", response);
    }
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Wishlist</h2>
      </div>
      <div className="product-grid">
        {wishListItems?.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-image">
              <img src={item.product.image} alt={item.product.productName} />
              <button
                className="delete-Wish"
                onClick={() => toggleFavorite(item.id)}
              >
                🗑️
              </button>
              <button className="add-to-cart">See Details</button>
            </div>
            <div className="product-info">
              <h3>{item.product.productName}</h3>
              <p className="price">
                {item.product.productDetails &&
                item.product.productDetails.length > 0
                  ? `${item.product.productDetails[0].unitPrice.toLocaleString()}đ`
                  : "Price not available"}
              </p>
              <div className="rating">
                <div>
                  <span>⭐⭐⭐⭐⭐</span>
                  <br />
                  <span>5.0 (23)</span>
                </div>
                <div className="favorite-button">
                  {/* Favorite button content */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
