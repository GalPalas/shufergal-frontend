const ProductDelivery = () => {
  return (
    <div>
      <p className="mt-3 font-medium">How do you want your item?</p>
      <div className="flex flex-row justify-between mt-3">
        <div className="flex flex-col justify-center items-center border-2 rounded-xl p-3 w-[7rem] cursor-pointer hover:border-red-700">
          <img src="/images/shipping.png" alt="img" className="w-10 h-10" />
          <p className="text-gray-500 font-medium">Shipping</p>
          <p className="text-gray-500 text-xs">Not available</p>
        </div>
        <div className="flex flex-col justify-center items-center border-2 rounded-xl p-3 w-[7rem] cursor-pointer hover:border-red-700">
          <img src="/images/pickup.png" alt="img" className="w-10 h-10" />
          <p className="text-gray-500 font-medium">Pickup</p>
          <p className="text-gray-500 text-xs">Today</p>
        </div>
        <div className="flex flex-col justify-center items-center border-2 rounded-xl p-3 w-[7rem] cursor-pointer hover:border-red-700">
          <img src="/images/delivery.png" alt="img" className="w-10 h-10" />
          <p className="text-gray-500 font-medium">Delivery</p>
          <p className="text-gray-500 text-xs">Today</p>
        </div>
      </div>
      <div className="border-b-2 h-5"></div>
    </div>
  );
};

export default ProductDelivery;
