import React from "react";
import { Category, Product } from "types";

type ProductsGridTitleProps = {
  selectedItem?: Category;
  items: Product[];
};

const ProductsGridTitle = ({ selectedItem, items }: ProductsGridTitleProps) => {
  return (
    <div className="flex items-center space-x-1">
      <h2 className="text-xl font-semibold ml-4">{selectedItem?.name}</h2>
      <span className="text-md text-slate-400">{`(${items.length})`}</span>
    </div>
  );
};

export default ProductsGridTitle;
