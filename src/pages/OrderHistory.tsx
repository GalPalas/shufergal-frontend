import Layout from "components/common/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadOrderHistory,
  orderHistoryState,
} from "store/slices/orderHistorySlice";
import { userState, UserState } from "store/slices/userSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const user: UserState = useSelector(userState);
  const { currentUser } = user;

  const orderHistoryList: any = useSelector(orderHistoryState);
  const { orders, loading, errorMessage } = orderHistoryList;

  useEffect(() => {
    dispatch(loadOrderHistory(currentUser._id));
  }, [currentUser._id, dispatch]);

  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="alert-error">{errorMessage}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="border-b">
                  <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                  <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                  <td className=" p-5 ">${order.totalPrice}</td>
                  <td className=" p-5 ">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "not paid"}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "not delivered"}
                  </td>
                  <td className=" p-5 ">
                    <Link to={`/order/${order._id}`} className="text-sky-500">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default OrderHistory;
