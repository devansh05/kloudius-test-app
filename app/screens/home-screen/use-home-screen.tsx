import { useCallback } from 'react';
import { useUserContext } from '../../context/user-context';

export const useHomeScreen = () => {
  const { clearUserAuth, authData, authMode, isAuthenticated } =
    useUserContext();
  console.log('isAuthenticated', isAuthenticated);

  const handleLogout = useCallback(() => {
    if (clearUserAuth) {
      clearUserAuth();
    }
    // Screen will automatically change to Login when isAuthenticated becomes false
  }, [clearUserAuth]);

  return {
    handleLogout,
    authData,
    authMode,
    isAuthenticated,
  };
};
