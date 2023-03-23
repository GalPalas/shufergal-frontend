import { Product } from "types";
import { HeartIconOutline, InformationCircleOutline } from "assets/icons";

type ProductInfoProps = {
  product: Product;
  onOpen: () => void;
  onAddProductToCart: () => void;
};

const ProductInfo = ({
  product,
  onOpen,
  onAddProductToCart,
}: ProductInfoProps) => {
  const round2 = (num: number) =>
    (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2);
  return (
    <div>
      <div className="absolute top-5 right-5 cursor-pointer">
        <HeartIconOutline />
      </div>
      <div className="text-sm text-gray-400 underline cursor-pointer hover:text-red-700 hover:no-underline">
        Marketside
      </div>
      <div className="mt-2 text-lg font-semibold">{product.name}</div>
      <div className="mt-2">
        <div className="text-3xl font-bold">
          ${round2(product.price!)}
          <span className="text-sm font-thin text-gray-400">
            {" "}
            each 71.0 ¢/lb
          </span>
        </div>
      </div>
      <div className="mt-2 text-gray-400">Final cost by weight</div>
      <div className="mt-2 text-xs inline-block">
        <div className="inline-flex gap-1">
          Price when purchased online{" "}
          <span className="cursor-pointer hover:text-red-700" onClick={onOpen}>
            <InformationCircleOutline />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="button mt-2 bg-red-700 text-white"
          onClick={onAddProductToCart}
        >
          Add to cart
        </button>
      </div>
      <div className="border-b-2 h-5"></div>
    </div>
  );
};

export default ProductInfo;
