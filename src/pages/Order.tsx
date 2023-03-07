import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Layout from "components/common/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import {
  loadOrderSummary,
  orderReceived,
  orderState,
  OrderState,
} from "store/slices/orderSlice";
import { Product } from "types";
import axios from "axios";
import {
  paymentReceived,
  paymentRequested,
  paymentRequestFailed,
  paymentReset,
  paymentState,
  PaymentState,
} from "store/slices/paymentSlice";
import { toast } from "react-toastify";
import { getError } from "utilities/error";

const Order = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const payment: PaymentState = useSelector(paymentState);
  const { loadingPay, successPay } = payment;

  const order: OrderState = useSelector(orderState);
  const { orderSummary, loading, errorMessage } = order;
  const {
    _id,
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,

    paidAt,
    deliveredAt,
  }: any = orderSummary!;

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId: any) => {
        return orderId;
      });
  };

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch(paymentRequested);
        const { data } = await axios.put(
          `http://localhost:5000/api/orders/${_id}/pay`,
          details
        );
        console.log(data.order);
        dispatch(paymentReceived);
        dispatch(orderReceived({ ...data.order }));
        toast.success("Order is paid successgully");
      } catch (err) {
        dispatch(paymentRequestFailed(getError(err)));
        toast.error(getError(err));
      }
    });
  }

  function onError(err: any) {
    toast.error(getError(err));
  }

  useEffect(() => {
    dispatch(loadOrderSummary(orderId));
    if (!_id || successPay || (_id && _id !== orderId)) {
      dispatch(loadOrderSummary(orderId));
      if (successPay) {
        dispatch(paymentReset);
      }
    } else {
      const loadPaypalScript = async () => {
        // const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id":
              "AUVGpa2jxi8X-mx-g8doWrGXy9TQIMGIZ-SMHYoQLqCnKQdDHWdg6g3f1QvYi-DBz0J0Pj-kbVcnSgJp",
            currency: "USD",
          },
        });
        // paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [dispatch, paypalDispatch, successPay, _id, orderId]);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="text-xl mb-4">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="alert-error">{errorMessage}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div>
                {shippingAddress?.fullName!},{shippingAddress?.address},
                {shippingAddress?.city},{shippingAddress?.postalCode},
                {shippingAddress?.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered At {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not Delivered</div>
              )}
            </div>
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid At {paidAt}</div>
              ) : (
                <div className="alert-error">Not Paid</div>
              )}
            </div>
            <div className="overflow-x-auto mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-right">Quantity</th>
                    <th className="px-5 text-right">Price</th>
                    <th className="px-5">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item: Product) => (
                    <tr key={item._id} className="border-b">
                      <td className="text-sky-700">
                        <Link
                          to={`/product/${item._id}`}
                          className="flex items-center"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20"
                          />
                          &nbsp; {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-center">{item.quantity}</td>
                      <td className="p-5 text-right">${round2(item.price!)}</td>
                      <td className="p-5 text-center">
                        ${round2(item.quantity! * item.price!)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5 min-h-screen">
            <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
            <ul>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                {!isPaid && (
                  <div>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
