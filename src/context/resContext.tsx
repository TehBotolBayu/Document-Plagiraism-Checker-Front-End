'use client'

import { AppContext } from 'next/app';
import React, { createContext, useContext, useState } from 'react';

// type resContextType = {
//     data: any
// }

type resContextType = {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

const resContext = createContext<resContextType|undefined>(undefined);

export const ResProvider = ({ children }:Readonly<{
  children: React.ReactNode;
}>) => {
  const [value, setValue] = useState<any>([]);
  return (
    <resContext.Provider value={{ value, setValue }}>
      {children}
    </resContext.Provider>
  );
};

// export { resContext, resProvider };
export const useResContext = () => {
  const context = useContext(resContext);
  if (!context) {
    throw new Error('useMyContext must be used within a ResProvider');
  }
  return context;
};