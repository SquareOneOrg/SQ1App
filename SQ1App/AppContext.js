import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState(null);

  return (
    <AppContext.Provider value={{ currentView, setCurrentView, viewParams, setViewParams }}>
      {children}
    </AppContext.Provider>
  );
};
