import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { loading, userInfo, setUserInfo } = useProvideAuth();

  return (
    <AuthContext.Provider
      value={{
        loading,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useProvideAuth = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

  }, []);
  return {
    loading,
    userInfo,
    setUserInfo
  };
};