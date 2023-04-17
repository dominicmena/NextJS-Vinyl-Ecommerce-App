import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-indigo-500 text-indigo-500"
                : "border-gray-400 text-gray-400"
            }`}
          >
            {" "}
            {step}
          </div>
        )
      )}
    </div>
  );
}

// This code exports a functional component named CheckoutWizard that takes an optional prop called activeStep. The component renders a series of steps with the text "User Login", "Shipping Address", "Payment Method", and "Place Order", each wrapped in a div. The currently active step is styled with a blue border and text, while the previous steps are styled with a gray border and text. If no activeStep prop is passed in, the default value is 0.