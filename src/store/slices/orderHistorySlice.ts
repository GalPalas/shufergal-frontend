import { RootState } from "store/store";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "store/actions/api";

//Move url to config file.
const url = "/orders/history";

export interface OrderState {
  orders: any;
  loading: boolean;
  errorMessage: string;
}

const initialState = {
  orders: [],
  loading: false,
  errorMessage: "",
};

export const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    orderHistoryRequested: (orderHistory, action) => {
      orderHistory.loading = true;
    },
    orderHistoryReceived: (orderHistory, action) => {
      orderHistory.orders = action.payload;
      orderHistory.loading = false;
    },
    orderHistoryRequestFailed: (orderHistory, action) => {
      orderHistory.errorMessage = action.payload;
      orderHistory.loading = false;
    },
  },
});

export const orderHistoryState = (state: RootState) =>
  state.entities.orderHistory;

export const loadOrderHistory = (userId: any) =>
  apiCallBegin({
    url: `${url}/${userId}`,
    onStart: orderHistoryRequested.type,
    onSuccess: orderHistoryReceived.type,
    onError: orderHistoryRequestFailed.type,
  });

export const {
  orderHistoryRequested,
  orderHistoryReceived,
  orderHistoryRequestFailed,
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
