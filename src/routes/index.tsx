import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyFn, lazyFnDelay } from "./lazy";

import HeroHeader from "@/pages/home/homePage/HeroHeader";

import OrderManager from '@/pages/admin/pages/order-manager/OrderManager';
import ProductManager from '@/pages/admin/pages/product-manager/ProductManager';
import CategoryManager from '@/pages/admin/pages/category-manager/CategoryManager';
import UserManager from '@/pages/admin/pages/user-manager/UserManager';
import BrandManager from '@/pages/admin/pages/brand-manager/BrandManager';
import ColorManager from '@/pages/admin/pages/color-manager/ColorManager';
import ConfigManager from '@/pages/admin/pages/config-manager/ConfigManager';

export default function index() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={lazyFnDelay(() => import("@pages/home/Home"))}>
          <Route path="" element={<HeroHeader></HeroHeader>} />
          <Route
            path="/contact"
            element={lazyFnDelay(() => import("@/pages/home/contact/Contact"))}
          />
          <Route
            path="/about"
            element={lazyFnDelay(() => import("@/pages/home/about/About"))}
          />
          <Route
            path="/sigup"
            element={lazyFn(() => import("@/pages/home/signup/SignUpPage"), {
              enable: localStorage.getItem("token") == null,
              fallBackUrl: "/",
            })}
          />
          <Route
            path="/sigin"
            element={lazyFn(() => import("@/pages/home/signup/LoginPage"), {
              enable: localStorage.getItem("token") == null,
              fallBackUrl: "/",
            })}
          />
          <Route
            path="/profile"
            element={lazyFn(() => import("@pages/home/pages/components/userLogin/profile/Profile"), {
              enable: localStorage.getItem("token") != null,
              fallBackUrl: "/",
            })}
          />
        </Route>
        <Route
          path="/manager"
          element={lazyFnDelay(() => import("@pages/admin/Admin"))}
        >
          <Route path="order" element={<OrderManager></OrderManager>} />
          <Route path="product" element={<ProductManager></ProductManager>} />
          
          <Route path="brand" element={<BrandManager></BrandManager>} />
          <Route path="category" element={<CategoryManager></CategoryManager>} />
          <Route path="user" element={<UserManager></UserManager>} />
          <Route path="color" element={<ColorManager></ColorManager>} />
          <Route path="config" element={<ConfigManager></ConfigManager>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
