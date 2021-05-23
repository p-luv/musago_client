import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { loading, token, setToken } = useProvideAuth();

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useProvideAuth = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {

  }, []);
  return {
    loading,
    token,
    setToken
  };
};