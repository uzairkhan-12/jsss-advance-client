/* eslint-disable @typescript-eslint/no-explicit-any */

import { SpinningLoader } from '@/components/ui/loading-skeletons/loaders';

interface ButtonProps {
  icon?: any;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  buttonStyles?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
}

export default function Button({
  icon,
  title,
  onClick,
  disabled,
  buttonStyles,
  type,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        `w-fit items-center gap-x-2 rounded-md  text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all ${
          buttonStyles ? buttonStyles : ''
        }`,
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {isLoading ? (
        <SpinningLoader />
      ) : (
        <div className="inline-flex items-center justify-center gap-x-2 w-full">
          {icon}
          {title}
        </div>
      )}
    </button>
  );
}
