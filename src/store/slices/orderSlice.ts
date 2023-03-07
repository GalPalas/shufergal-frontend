import { RootState } from "store/store";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "store/actions/api";

//Move url to config file.
const url = "/orders";

export interface OrderState {
  orderSummary: {};
  loading: boolean;
  errorMessage: string;
}

const initialState = {
  orderSummary: {},
  loading: false,
  errorMessage: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequested: (order, action) => {
      order.loading = true;
    },
    orderReceived: (order, action) => {
      order.orderSummary = action.payload;
      order.loading = false;
    },
    orderRequestFailed: (order, action) => {
      order.errorMessage = action.payload;
      order.loading = false;
    },
  },
});

export const orderState = (state: RootState) => state.entities.order;

export const loadOrderSummary = (orderId: any) =>
  apiCallBegin({
    url: `${url}/${orderId}`,
    onStart: orderRequested.type,
    onSuccess: orderReceived.type,
    onError: orderRequestFailed.type,
  });

export const { orderRequested, orderReceived, orderRequestFailed } =
  orderSlice.actions;

export default orderSlice.reducer;
