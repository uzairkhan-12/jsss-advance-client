/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const CardLayout = (props: any) => {
  return (
    <div className="border border-gray-300 rounded-lg p-5">
      {props.children}
    </div>
  );
};

export default CardLayout;
