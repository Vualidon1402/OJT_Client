import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryAction, categoryReducer, CategoryState } from "./slices/category.slice"
import { userActions, userReducer, UserState } from "./slices/user.slice";
import { brandAction, brandReducer, BrandState } from "./slices/brand.slice"
import { ColorState, colorReducer, colorAction } from "./slices/color.slice"
import { configAction, configReducer, ConfigState } from "./slices/config.slice"
import { bannerAction, bannerReducer, BannerState } from "./slices/banner.slice";
import { wishListActions, wishListReducer, WishListState } from "./slices/wishList.slice";
import { useDispatch } from "react-redux";

export type StoreType = {
  categoryStore: CategoryState,
  brandStore: BrandState,
  colorStore: ColorState,
  configStore: ConfigState,
userStore: UserState,
bannerStore: BannerState,
wistListStore: WishListState


}

const RootReducer = combineReducers({
    categoryStore: categoryReducer,
    brandStore: brandReducer,
    colorStore: colorReducer,
    configStore: configReducer,
    userStore: userReducer,
    bannerStore: bannerReducer,
    wistListStore: wishListReducer

})

const store = configureStore({
    reducer: RootReducer
})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

store.dispatch(categoryAction.findAllThunk())
store.dispatch(userActions.findDataThunk())
store.dispatch(bannerAction.findAllThunk())
store.dispatch(brandAction.findAllThunk())
store.dispatch(colorAction.findAllThunk())
store.dispatch(configAction.findAllThunk())
store.dispatch(wishListActions.findAllThunk());

export default store;