import { useState, useEffect } from "react";
import { getProducts } from "services/productService";
import { Product } from "types";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (e) {}
    };
    fetchProducts();
  }, []);

  return { products };
};

export default useFetchProducts;
