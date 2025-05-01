import { FC } from 'react';

/**
 * Interface that defines the properties for the StepProgress component
 * @interface StepProgressProps
 * @property {number} currentStep - The current step in the process
 * @property {number} totalSteps - The total number of steps in the process
 */
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * Component that displays a progress bar to indicate advancement in a multi-step process
 * @component
 * @param {StepProgressProps} props - The component properties
 * @returns {JSX.Element} Progress bar with current step indicator
 * 
 * @example
 * ```tsx
 * <StepProgress currentStep={2} totalSteps={4} />
 * ```
 */
const StepProgress: FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-500">{`Step ${currentStep} of ${totalSteps}`}</span>
    </div>
  );
};

export default StepProgress;
