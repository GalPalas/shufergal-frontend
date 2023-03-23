import { GiftIconOutline, HeartIconOutline } from "assets/icons";

const ProductRetention = () => {
  return (
    <div className="grid grid-cols-2 divide-x-2 text-center p-4">
      <div className="flex flex-row underline cursor-pointer hover:text-red-700 hover:no-underline">
        <span className="mx-2">
          <HeartIconOutline />
        </span>
        Add to list
      </div>
      <div className="flex flex-row underline cursor-pointer hover:text-red-700 hover:no-underline">
        <span className="mx-2">
          <GiftIconOutline />
        </span>
        Add to registry
      </div>
    </div>
  );
};

export default ProductRetention;
