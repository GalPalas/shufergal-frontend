import CheckoutWizard from "components/common/CheckoutWizard";
import Layout from "components/common/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartClearItems, cartState, CartState } from "store/slices/cartSlice";
import { formatCurrency } from "utilities/formatCurrency";
import { Product } from "types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "utilities/error";
import { userState, UserState } from "store/slices/userSlice";

const Placeorder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart: CartState = useSelector(cartState);
  const user: UserState = useSelector(userState);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { currentUser } = user;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce(
      (acc, item: Product) => acc + item.quantity! * item.price!,
      0
    )
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        {
          userId: currentUser._id,
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        }
      );
      setLoading(false);
      dispatch(cartClearItems);
      navigate(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err), {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="text-xl mb-4">place order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.<Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div>
                {shippingAddress.fullName},{shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country}
              </div>
              <div className="text-red-700 underline">
                <Link to="/shipping">Edit</Link>
              </div>
            </div>
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div className="text-red-700 underline">
                <Link to="/payment">Edit</Link>
              </div>
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
                  {cartItems.map((item: Product) => (
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
                      <td className="p-5 text-right">
                        {formatCurrency(item.price!)}
                      </td>
                      <td className="p-5 text-center">
                        {formatCurrency(item.quantity! * item.price!)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-red-700 underline">
                <Link to="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5 h-[300px]">
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
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="w-full couter-button"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Placeorder;
