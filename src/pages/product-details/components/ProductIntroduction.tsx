import { Product } from "types";
import PlusCircleIconOutline from "assets/icons/PlusCircleIconOutline";

type ProductIntroductionProps = {
  product: Product;
  productImage: string;
};

const ProductIntroduction = ({
  product,
  productImage,
}: ProductIntroductionProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <img src={productImage || product.image} alt={product.name} />
      <div>
        <p>Roll over image to zoom in</p>
      </div>
      <div>
        <PlusCircleIconOutline />
      </div>
    </div>
  );
};

export default ProductIntroduction;
