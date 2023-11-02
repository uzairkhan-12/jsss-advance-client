/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

function ToggleCheckbox({
  isTrue,
  label,
  handleToggleChange,
}: {
  isTrue: boolean;
  label: string;
  handleToggleChange: any;
}) {
  return (
    <div className="">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <label
        className="inline-flex items-center py-2 rounded-md cursor-pointer dark:text-gray-800"
        htmlFor="Toggle3"
      >
        <input
          className="hidden peer"
          id="Toggle3"
          onChange={handleToggleChange}
          type="checkbox"
        />
        <span
          className={`px-4 py-1.5 rounded-l-md ${
            isTrue ? 'text-white bg-gray-800' : 'text-white bg-gray-300'
          }`}
        >
          Yes
        </span>
        <span
          className={`px-4 py-1.5 rounded-r-md ${
            !isTrue ? 'text-white bg-gray-800' : 'text-white bg-gray-300'
          }`}
        >
          No
        </span>
      </label>
    </div>
  );
}

export default ToggleCheckbox;
