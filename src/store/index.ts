import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { categoryAction, categoryReducer, CategoryState } from "./slices/category.slice"
import { userActions, userReducer, UserState } from "./slices/user.slice";

export type StoreType = {
  categoryStore: CategoryState;
  userStore: UserState;
};

const RootReducer = combineReducers({
  categoryStore: categoryReducer,
  userStore: userReducer,
});

const store = configureStore({
    reducer: RootReducer
})

store.dispatch(categoryAction.findAllThunk())
store.dispatch(userActions.findDataThunk());

export default store;