import { products } from "data/fakeProductService";
import Layout from "components/common/Layout";
import { Product } from "types";
import { formatCurrency } from "utilities/formatCurrency";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartState, cartState } from "store/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart: CartState = useSelector(cartState);

  const product: any = products.find((p: any) => p._id === id)!;
  if (!product) return <div>Product Not Found</div>;

  const addToCartHandler = () => {
    const existItem: Product = cart.cartItems.find(
      (item: Product) => item._id === product._id
    )!;
    const quantity = existItem ? existItem.quantity! + 1 : 1;

    if (product.numberInStock! < quantity) {
      alert("Sorry, Product is out of stock");
      return;
    }

    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <Layout title="Product Details">
      <div className="py-2">
        <Link to="/" className="underline">
          Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-3 md:gap-3">
        <div className="md:col-span-2">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="hidden relative mb-5 rounded-lg border border-gray-200 shadow-md p-5 md:block">
          <div className="absolute top-10 p-3">
            <div className="mt-4 text-xl font-semibold">{product.name}</div>
            <div className="flex flex-col mt-4">
              <div className="flex justify-between mb-2 text-lg font-semibold">
                <div>Price</div>
                <div className="mr-2">{formatCurrency(product.price!)}</div>
              </div>
              <div className="flex justify-between mb-2 text-lg font-semibold">
                <div>Status</div>
                <div className="mr-2">
                  {product.numberInStock! > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="button w-full mt-2 bg-red-700 text-white"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
