import { createContext, useContext } from 'react';
import { useStore } from './';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};