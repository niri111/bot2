'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a context for loading state
const LoadingContext = createContext({
  isLoading: false,
  setLoading: (loading: boolean) => {},
});

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

// LoadingProvider component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
