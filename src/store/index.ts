import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryAction, categoryReducer, CategoryState } from "./slices/category.slice"

export type StoreType = {
    categoryStore: CategoryState
}

const RootReducer = combineReducers({
    categoryStore: categoryReducer,
})

const store = configureStore({
    reducer: RootReducer
})

store.dispatch(categoryAction.findAllThunk())

export default store;