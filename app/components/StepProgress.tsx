import { FC } from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-500">{`Paso ${currentStep} de ${totalSteps}`}</span>
    </div>
  );
};

export default StepProgress;
