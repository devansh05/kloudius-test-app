import { useUserContext } from '../../context/user-context';

export const useHomeScreen = () => {
  const { clearUserAuth, authData, authMode, isAuthenticated } =
    useUserContext();
  console.log('isAuthenticated', isAuthenticated);

  const handleLogout = () => {
    clearUserAuth();
    // Screen will automatically change to Login when isAuthenticated becomes false
  };

  return {
    handleLogout,
    authData,
    authMode,
    isAuthenticated,
  };
};
