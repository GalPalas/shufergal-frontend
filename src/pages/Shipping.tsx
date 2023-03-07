import Layout from "components/common/Layout";
import CheckoutWizard from "components/common/CheckoutWizard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  cartState,
  CartState,
  saveShippingAddress,
} from "store/slices/cartSlice";

type FormShippingInputs = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart: CartState = useSelector(cartState);
  const { shippingAddress } = cart;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormShippingInputs>();

  const onSubmit: SubmitHandler<FormShippingInputs> = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    navigate("/payment");
  };

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="fullName"
            {...register("fullName", {
              required: "Please enter full name",
            })}
            id="fullName"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Adress</label>
          <input
            type="address"
            {...register("address", {
              required: "Please enter address",
              minLength: {
                value: 3,
                message: "Please enter more than 2 characters",
              },
            })}
            id="address"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="city"
            {...register("city", {
              required: "Please enter city",
            })}
            id="city"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="postalCode"
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
            id="postalCode"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            type="country"
            {...register("country", {
              required: "Please enter country",
            })}
            id="country"
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            autoFocus
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-red-700 text-white rounded-md">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Shipping;
