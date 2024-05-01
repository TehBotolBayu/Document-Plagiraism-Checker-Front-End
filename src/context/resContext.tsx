'use client'

import React, { createContext, useContext, useState } from 'react';

// type resContextType = {
//     data: any
// }


const resContext = createContext();

export const ResProvider = ({ children }) => {
  const [value, setValue] = useState<Object>([]);
  return (
    <resContext.Provider value={{ value, setValue }}>
      {children}
    </resContext.Provider>
  );
};

// export { resContext, resProvider };
export const useResContext = () => useContext(resContext);