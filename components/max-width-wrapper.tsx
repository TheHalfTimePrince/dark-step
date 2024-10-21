'use client'
import React, { useEffect, useState } from 'react';

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const width = window.innerWidth - document.documentElement.clientWidth;
    setScrollbarWidth(width);
  }, []);

  return (
    <div
      className='widthComponent  flex flex-col flex-grow min-width-0 justify-between'
      style={{ maxWidth: `calc(100vw - ${scrollbarWidth}px)`, overflowX: 'hidden' }}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;