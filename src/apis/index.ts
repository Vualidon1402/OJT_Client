
import './axios.instance'
import { category } from './modules/category';
import { productApi } from './modules/product';
import { userApi } from "./modules/user";

export default {
    category: category,
    user: userApi,
    product : productApi
}

