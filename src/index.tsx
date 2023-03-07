import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "store/store";
import App from "App";
import "index.css";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AQJIbAt4hX96Y013JuyqlEp6FzssilC1--d6n8wdAJIbctnTSdTk5hER5NCzwDODQMiMugUM2AWylFlz",
        }}
      >
        <App />
      </PayPalScriptProvider>
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);
