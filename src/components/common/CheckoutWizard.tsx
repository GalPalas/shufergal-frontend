type CheckoutWizardProps = {
  activeStep: number;
};

const CheckoutWizard = ({ activeStep = 0 }: CheckoutWizardProps) => {
  return (
    <div className="flex flex-wrap mb-5">
      {["User Login", "Shipping Amount", "Payment Method", "Place Order"].map(
        (step: string, index: number) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-purple-500 text-purple-500"
                : "border-gray-400 text-gray-400"
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
};

export default CheckoutWizard;
