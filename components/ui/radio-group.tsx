/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { RadioGroup } from '@headlessui/react';

export default function RadioSelector({ plans, selected, setSelected }: any) {
  function getClassName(plan: any) {
    const classNames = ['h-5 border border-gray-500 rounded-full w-5'];
    switch (plan.code) {
      case 'primary':
        classNames.push('bg-primary-dark');
        break;
      case 'blue_shades':
        classNames.push('bg-gradient-to-r from-cyan-500 to-blue-500');
        break;
      case 'green_shades':
        classNames.push('bg-gradient-to-r from-cyan-500 to-green-500');
        break;
      case 'dark':
        classNames.push('bg-stone-500');
        break;
      default:
        break;
    }

    return classNames.join(' ');
  }
  return (
    <div className="mx-auto w-full max-w-md">
      <RadioGroup onChange={setSelected} value={selected}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-2">
          {plans.map((plan: any) => (
            <RadioGroup.Option
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : ''
                }
                  ${
                    checked
                      ? 'bg-primary-dark  text-white'
                      : 'bg-white hover:bg-stone-50'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border border-gray-200 transition-all`
              }
              key={plan.name}
              value={plan}
            >
              {({ checked }: any) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium flex gap-x-3  ${
                            checked ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          <div className={getClassName(plan)}></div>
                          {plan.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx={12} cy={12} fill="#fff" opacity="0.2" r={12} />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}
