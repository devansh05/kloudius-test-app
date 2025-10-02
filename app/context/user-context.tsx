import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { AuthData, AuthMode } from '../screens/login-screen/types';

export interface UserContextType {
  authData: AuthData | null;
  authMode: AuthMode | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  saveUserAuthDetails: (authData: AuthData, authMode: AuthMode) => void;
  clearUserAuth: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Storage keys
  const AUTH_DATA_KEY = 'user_auth_data';
  const AUTH_MODE_KEY = 'user_auth_mode';

  // Load saved auth data when app starts
  useEffect(() => {
    const loadSavedAuthData = async () => {
      try {
        const savedAuthData = await AsyncStorage.getItem(AUTH_DATA_KEY);
        const savedAuthMode = await AsyncStorage.getItem(AUTH_MODE_KEY);

        if (savedAuthData && savedAuthMode) {
          setAuthData(JSON.parse(savedAuthData));
          setAuthMode(savedAuthMode as AuthMode);
          console.log('Loaded saved auth data from storage');
        }
      } catch (error) {
        console.error('Error loading auth data from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedAuthData();
  }, []);

  const saveUserAuthDetails = async (userData: AuthData, mode: AuthMode) => {
    try {
      setAuthData(userData);
      setAuthMode(mode);

      // Save to AsyncStorage
      await AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(AUTH_MODE_KEY, mode);

      console.log('User auth details saved to context and storage:', {
        userData,
        mode,
      });
    } catch (error) {
      console.error('Error saving auth data to storage:', error);
    }
  };

  const clearUserAuth = async () => {
    try {
      setAuthData(null);
      setAuthMode(null);

      // Clear from AsyncStorage
      await AsyncStorage.removeItem(AUTH_DATA_KEY);
      await AsyncStorage.removeItem(AUTH_MODE_KEY);

      console.log('User auth details cleared from context and storage');
    } catch (error) {
      console.error('Error clearing auth data from storage:', error);
    }
  };

  const isAuthenticated = authData !== null;

  const value: UserContextType = {
    authData,
    authMode,
    isAuthenticated,
    isLoading,
    saveUserAuthDetails,
    clearUserAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
