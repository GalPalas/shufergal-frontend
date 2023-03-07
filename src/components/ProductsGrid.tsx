import { Product } from "types";
import ProductItem from "components/ProductItem";

type ProductsGridProps = {
  products: Product[];
  onLike: (product: Product) => void;
};

const ProductsGrid = ({ products, onLike }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product: Product) => (
        <ProductItem
          key={product._id}
          details={product}
          handleLike={() => onLike(product)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
