import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryAction, categoryReducer, CategoryState } from "./slices/category.slice"
import { userActions, userReducer, UserState } from "./slices/user.slice";
import { brandAction, brandReducer, BrandState } from "./slices/brand.slice"
import { ColorState, colorReducer, colorAction } from "./slices/color.slice"
import { configAction, configReducer, ConfigState } from "./slices/config.slice"
import { bannerAction, bannerReducer, BannerState } from "./slices/banner.slice";

export type StoreType = {
  categoryStore: CategoryState,
  brandStore: BrandState,
  colorStore: ColorState,
  configStore: ConfigState,
userStore: UserState,
bannerStore: BannerState


}

const RootReducer = combineReducers({
    categoryStore: categoryReducer,
    brandStore: brandReducer,
    colorStore: colorReducer,
    configStore: configReducer,
    userStore: userReducer,
    bannerStore: bannerReducer

})

const store = configureStore({
    reducer: RootReducer
})

store.dispatch(categoryAction.findAllThunk())
store.dispatch(userActions.findDataThunk());
store.dispatch(bannerAction.findAllThunk())
store.dispatch(brandAction.findAllThunk())
store.dispatch(colorAction.findAllThunk())
store.dispatch(configAction.findAllThunk())

export default store;