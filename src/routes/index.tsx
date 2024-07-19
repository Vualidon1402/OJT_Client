
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazyFnDelay } from './lazy';
import Product from '@pages/home/homePage/product/Product';
export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={lazyFnDelay(() => import("@pages/home/Home"))}
        >
        <Route
          path=""
          element={<Product></Product>}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
