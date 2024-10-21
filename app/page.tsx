'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import MaxWidthWrapper from '@/components/max-width-wrapper';

// Dynamically import Sequencer with SSR turned off
const Sequencer = dynamic(() => import('@/components/sequencer'), { ssr: false });

const page = () => {
  return (
    <MaxWidthWrapper>
        <Sequencer />
    </MaxWidthWrapper>
  );
};

export default page;