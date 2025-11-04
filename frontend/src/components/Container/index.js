import React from 'react';
const Container = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="grid w-full px-0 sm:px-10 min-h-full sm:max-w-[80vw] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Container;
