
import './axios.instance'
import { brandApi } from './modules/brand';
import { category } from './modules/category';
import { colorApi } from './modules/color';
import { configApi } from './modules/config';
import { productApi } from './modules/product';
import { userApi } from "./modules/user";

export default {
    category: category,
    user: userApi,
    product : productApi,
    brand: brandApi,
    color: colorApi,
    config: configApi
}

