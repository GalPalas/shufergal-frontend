import { Product } from "types";

type ImageSliderProps = {
  product: Product;
  onClickProductImage: (image: string) => void;
};

const ImageSlider = ({ product, onClickProductImage }: ImageSliderProps) => {
  return (
    <div className="flex flex-col justify-center items-center md:w-1/2 gap-2">
      {product.images!.map((image: string, index: number) => (
        <div
          key={index}
          className="hover:border-b-4 hover:border-red-700 cursor-pointer"
        >
          <img
            src={image}
            alt={product.name}
            onClick={() => onClickProductImage(image)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
