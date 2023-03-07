import { RootState } from "store/store";
import { createSlice } from "@reduxjs/toolkit";

export interface PaymentState {
  loadingPay: boolean;
  successPay: boolean;
  errorPay: string;
}

const initialState = {
  loadingPay: false,
  successPay: false,
  errorPay: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentRequested: (payment, action) => {
      payment.loadingPay = true;
    },
    paymentReceived: (payment, action) => {
      payment.successPay = true;
      payment.loadingPay = false;
    },
    paymentRequestFailed: (payment, action) => {
      payment.errorPay = action.payload;
      payment.loadingPay = false;
    },
    paymentReset: (payment, action) => {
      payment.loadingPay = false;
      payment.successPay = false;
      payment.errorPay = "";
    },
  },
});

export const paymentState = (state: RootState) => state.entities.payment;

export const {
  paymentRequested,
  paymentReceived,
  paymentRequestFailed,
  paymentReset,
} = paymentSlice.actions;

export default paymentSlice.reducer;
