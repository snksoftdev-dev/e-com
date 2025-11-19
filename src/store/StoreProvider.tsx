'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { loadCartFromStorage } from './slices/cartSlice';

interface StoreProviderProps {
  children: ReactNode;
}

function StoreInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only load cart from localStorage - no automatic auth verification
    // Auth verification will happen when user tries to access protected routes
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <StoreInitializer>
        {children}
      </StoreInitializer>
    </Provider>
  );
}
