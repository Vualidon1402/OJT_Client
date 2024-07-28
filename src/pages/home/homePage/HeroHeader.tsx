import React from "react";
import Navbar from "./navbar/Navbar";
import Carousel from "./carousel/Carousel";

import Product from "./product/ProductList";

import "./HeroHeader.scss";
import CategoryBrowserProps from "./category/CategoryBrowserProps";
import FlashSales from "./flashSales/FlashSales";
import BestSellingProducts from "./bestsellingproducts/Bestsellingproducts";

export default function HeroHeader() {
  return (
    <>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Carousel />
        </main>
      </div>
      <div className="product">
        <FlashSales />
        <CategoryBrowserProps />
        <BestSellingProducts />
        <Product />
      </div>
    </>
  );
}
