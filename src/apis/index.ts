
import './axios.instance'
import { bannerApi } from './modules/banner';
import { brandApi } from './modules/brand';
import { category } from './modules/category';
import { colorApi } from './modules/color';
import { configApi } from './modules/config';
import { productApi } from './modules/product';
import { productDetailApi } from './modules/product-detail';
import { userApi } from "./modules/user";
import { wishListApi } from './modules/wishlist';

export default {

  category: category,
  user: userApi,
  product: productApi,
  brand: brandApi,
  color: colorApi,
  config: configApi,
  banner: bannerApi,
  productDetail: productDetailApi,
  wishlist: wishListApi,
};

