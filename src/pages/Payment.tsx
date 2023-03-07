import CheckoutWizard from "components/common/CheckoutWizard";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cartState,
  CartState,
  savePaymentMethod,
} from "store/slices/cartSlice";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart: CartState = useSelector(cartState);
  const { shippingAddress, paymentMethod } = cart;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { handleSubmit } = useForm<any>();

  const handleErrorToast = () => {
    toast.error("Please select payment method", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onSubmit: SubmitHandler<any> = () => {
    if (!selectedPaymentMethod) {
      handleErrorToast();
      return;
    }
    dispatch(savePaymentMethod(selectedPaymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) return navigate("/shipping");
    setSelectedPaymentMethod(paymentMethod);
  }, [paymentMethod, navigate, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["PayPal", "Stripe", "CashOnDelivery"].map((payment: string) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-700 text-white rounded-md"
            onClick={() => navigate("/shipping")}
          >
            Back
          </button>
          <button className="px-4 py-2 bg-red-700 text-white rounded-md">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Payment;
