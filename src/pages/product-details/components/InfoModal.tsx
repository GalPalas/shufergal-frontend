import CloseIconOutline from "assets/icons/CloseIconOutline";

type InfoModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const InfoModal = ({ isVisible, onClose }: InfoModalProps) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target?.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-none flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[800px]">
        <div className="bg-white p-2 rounded flex flex-col">
          <div className="flex flex-row justify-between items-center p-4">
            <h2 className="text-2xl font-bold">Pricing Information</h2>
            <span onClick={onClose} className="cursor-pointer">
              <CloseIconOutline />
            </span>
          </div>
          <p className="text-sm p-4">
            Prices, terms, and availability may vary online, in stores, and
            in-app. Items ordered online may be available for pick up at store,
            shipping, or delivery. Some items may be available from Marketplace
            Sellers, who set their own prices, and are not eligible for price
            match. Items sold online by Shufergal may be eligible for price
            match. See our{" "}
            <span className="underline cursor-pointer">Price Match Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
