import Layout from "components/common/Layout";
import { Product } from "types";
import { useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartState, cartState } from "store/slices/cartSlice";
import useFetchProducts from "pages/product-details/hooks/useFetchProducts";
import {
  InfoModal,
  ImageSlider,
  ProductIntroduction,
  ProductInfo,
  ProductDelivery,
  ProductRetention,
} from "pages/product-details/components";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart: CartState = useSelector(cartState);

  const { products } = useFetchProducts();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<string>();

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
        <div className="md:col-span-2 p-3">
          <div className="grid md:grid-cols-3 md:gap-2">
            <ImageSlider
              product={product}
              onClickProductImage={(image: string) => setProductImage(image)}
            />
            <div className="md:col-span-2">
              <ProductIntroduction
                product={product}
                productImage={productImage!}
              />
            </div>
          </div>
        </div>
        <div className="hidden relative mb-5 rounded-lg border border-gray-200 shadow-md p-5 md:block">
          <ProductInfo
            product={product}
            onOpen={() => setShowModal(true)}
            onAddProductToCart={addToCartHandler}
          />
          <ProductDelivery />
          <ProductRetention />
        </div>
      </div>
      <InfoModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </Layout>
  );
};

export default ProductDetails;
