
import React from 'react'
//Admin
import OrderManager from '@/pages/admin/pages/order-manager/OrderManager';
import ProductManager from '@/pages/admin/pages/product-manager/ProductManager';
import CategoryManager from '@/pages/admin/pages/category-manager/CategoryManager';
import UserManager from '@/pages/admin/pages/user-manager/UserManager';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazyFnDelay } from './lazy';
import Product from '@pages/home/homePage/product/Product';

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={lazyFnDelay(() => import("@pages/home/Home"))}>
          <Route path="" element={<Product></Product>} />
        </Route>
        <Route
          path="/manager"
          element={lazyFnDelay(() => import("@pages/admin/Admin"))}
        >
          <Route path="order" element={<OrderManager></OrderManager>} />
          <Route path="product" element={<ProductManager></ProductManager>} />
          <Route path="category" element={<CategoryManager></CategoryManager>} />
          <Route path="user" element={<UserManager></UserManager>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
