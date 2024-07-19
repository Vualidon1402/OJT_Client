
import './axios.instance'
import { category } from './modules/category';
import { userApi } from "./modules/user";

export default {
    category: category,
    user: userApi,
}

