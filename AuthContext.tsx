import React, { createContext, useState } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState(null);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
