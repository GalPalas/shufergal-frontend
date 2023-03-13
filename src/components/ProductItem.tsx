import { Product } from "types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Like } from "components/common/Like";
import { formatCurrency } from "utilities/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartState,
  CartState,
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "store/slices/cartSlice";

type ProductProps = {
  details: Product;
  key: string;
  handleLike: () => void;
};

const ProductItem = ({ details, handleLike }: ProductProps) => {
  const { _id, image, name, price, liked } = details;
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const cart: CartState = useSelector(cartState);

  const addToCartHandler = () => {
    const existItem: Product = cart.cartItems.find(
      (item: Product) => item._id === details._id
    )!;
    const quantity = existItem ? existItem.quantity! + 1 : 1;

    if (details.numberInStock! < quantity) {
      alert("Sorry, This product is out of stock");
      return;
    }

    setQuantity(quantity);
    dispatch(addToCart({ ...details, quantity }));
  };

  const HandleIncrement = (_id: string) => {
    const existItem: Product = cart.cartItems.find(
      (item: Product) => item._id === details._id
    )!;
    const quantity = existItem ? existItem.quantity! + 1 : 1;

    if (details.numberInStock! < quantity) {
      alert("Sorry, This product is out of stock");
      return;
    }

    setQuantity(quantity);
    dispatch(incrementQuantity(_id));
  };

  const HandleDecrement = (_id: string) => {
    const existItem: Product = cart.cartItems.find(
      (item: Product) => item._id === details._id
    )!;
    const quantity = existItem ? existItem.quantity! - 1 : 0;
    setQuantity(quantity);
    dispatch(decrementQuantity(_id));
  };

  const resetProduct = (item: Product) => {
    setQuantity(0);
    dispatch(removeItemFromCart(item));
  };

  return (
    <div className="relative cursor-pointer p-3">
      <Link to={`/product/${_id}`}>
        <img src={image} alt={name} />
      </Link>
      <div className="absolute top-0 right-0 p-1">
        <Like liked={liked!} onLikeToggle={handleLike} />
      </div>
      <div className="flex flex-col p-2">
        <p className="text-lg font-bold">{formatCurrency(price!)}</p>
        <p className="text-md text-slate-500">
          {name?.substring(0, 50).concat("...")}
        </p>
      </div>
      <div className="mt-auto flex justify-center">
        {quantity === 0 ? (
          <button type="button" className="button" onClick={addToCartHandler}>
            Add to cart
          </button>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="flex space-x-2 items-center">
              <button
                type="button"
                className="couter-button"
                onClick={() => HandleDecrement(_id)}
              >
                -
              </button>
              <div>
                <span className="text-lg font-semibold">{quantity} </span> In
                Cart
              </div>

              <button
                type="button"
                className="couter-button"
                onClick={() => HandleIncrement(_id)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-black text-white font-bold rounded-full hover:bg-gray-600"
              onClick={() => resetProduct(details)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
