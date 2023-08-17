// TokenContext.js

import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  getToken,
  setToken as setTokenInStorage,
  removeToken,
} from './TokenManager';

const TokenContext = createContext();

export const TokenProvider = ({children}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function initializeToken() {
      const storedToken = await getToken();
      setToken(storedToken);
    }
    initializeToken();
  }, []);

  const setTokenValue = async newToken => {
    if (newToken) {
      await setTokenInStorage(newToken);
      setToken(newToken);
    } else {
      removeToken();
      setToken(null);
    }
  };

  return (
    <TokenContext.Provider value={{token, setToken: setTokenValue}}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
