import { Product, Category, SortType } from "types";
import { paginate } from "utilities/paginate";
import { useEffect, useState } from "react";
import { getProducts } from "services/productService";
import { getCategories } from "services/categoryService";
import ProductItem from "components/ProductItem";
import Pagination from "components/common/Pagination";
import ListGroup from "components/common/ListGroup";
import ProductsGridTitle from "components/ProductsGridTitle";
import {
  StoreIconOutline,
  BrandIconOutline,
  SpeedIconOutline,
  MoreFiltersIconOutline,
} from "assets/icons";
import ListBox from "./common/ListBox";
import _ from "lodash";
import FilterPrice from "./FilterPrice";
// import ProductsGrid from "components/ProductsGrid";

const Products = () => {
  const [pageSize] = useState<number>(8);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [sortGrid, setSortGrid] = useState<SortType>({
    name: "Best Match",
    lable: "",
    order: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCategories();
      const { data: products } = await getProducts();
      const categories: Category[] = [
        { _id: "", name: "All Categories" },
        ...data,
      ];
      setProducts(products);
      setCategories(categories);
      setSelectedCategory({ name: "All Categories" });
    };
    fetchData();
  }, []);

  const handleLike = (product: Product) => {
    const items: Product[] = [...products];
    const index = items.indexOf(product);
    items[index] = { ...items[index] };
    items[index].liked = !items[index].liked;
    setProducts(items);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: Category): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (sortType: SortType) => {
    setSortGrid({
      name: sortType.name,
      lable: sortType.lable,
      order: sortType.order,
    });
  };

  const filterd: Product[] =
    selectedCategory && selectedCategory._id
      ? products.filter(
          (product: Product) => product.category?._id === selectedCategory._id
        )
      : products;

  const sorted: any = _.orderBy(filterd, [sortGrid.lable], [sortGrid.order]);

  const paginatedProducts = paginate(sorted, currentPage, pageSize);

  return (
    <div className="flex">
      <div className="hidden md:flex w-48 h-min">
        <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="grow">
        <ProductsGridTitle selectedItem={selectedCategory} items={filterd} />

        <div className="hidden space-x-3 text-gray-800 w-100 lg:flex p-2">
          <div className="flex grow items-center justify-between">
            <div className="flex space-x-1">
              <p className="button-sort flex items-center space-x-1">
                <StoreIconOutline />
                <span>In-Store</span>
              </p>
              <div>
                <FilterPrice />
              </div>
              <p className="button-sort flex items-center space-x-1">
                <BrandIconOutline />
                <span>Brand</span>
              </p>
              <p className="button-sort flex items-center space-x-1">
                <SpeedIconOutline />
                <span>Speed</span>
              </p>
              <p className="button-sort flex items-center space-x-1">
                <MoreFiltersIconOutline />
                <span>More filters</span>
              </p>
              <p className="flex items-center space-x-1 cursor-pointer text-sm underline">
                Clear all
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2">
              <div className="text-md font-bold">Sort by |</div>
              <div>
                <ListBox onSort={handleSort} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b w-100 ml-3 mb-2"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((product: Product) => (
            <ProductItem
              key={product._id}
              details={product}
              handleLike={() => handleLike(product)}
            />
          ))}
        </div>

        {/* <ProductsGrid products={paginatedProducts} onLike={handleLike(product)}/> */}

        <Pagination
          itemsCount={filterd.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
