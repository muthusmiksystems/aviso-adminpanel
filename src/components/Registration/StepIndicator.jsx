import React from "react";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    
        <img
          src={steps[currentStep].image}
          alt={steps[currentStep].title}
          className="w-full h-auto"
        />
    
  );
};

export default StepIndicator;
