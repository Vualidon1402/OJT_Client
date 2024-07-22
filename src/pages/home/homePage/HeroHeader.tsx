import React from "react";
import Navbar from "./navbar/Navbar";
import Carousel from "./carousel/Carousel";

import Product from "./product/Product";

import "./HeroHeader.scss";

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
        <Product />
      </div>
    </>
  );
}
