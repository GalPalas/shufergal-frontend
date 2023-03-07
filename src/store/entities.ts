import { combineReducers } from "redux";
import cartReducer from "store/slices/cartSlice";
import userReducer from "store/slices/userSlice";
import orderReducer from "store/slices/orderSlice";
import paymentReducer from "store/slices/paymentSlice";
import orderHistoryReducer from "store/slices/orderHistorySlice";

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  payment: paymentReducer,
  orderHistory: orderHistoryReducer,
});
