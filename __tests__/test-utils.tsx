import { render, RenderOptions } from '@testing-library/react-native';
import React from 'react';
import { UserContextType, UserProvider } from '../app/context/user-context';

// Mock UserContext default values
const mockUserContextValue: UserContextType = {
  authData: null,
  authMode: null,
  isAuthenticated: false,
  isLoading: false,
  saveUserAuthDetails: jest.fn(),
  clearUserAuth: jest.fn(),
};

// Custom render function that wraps components with necessary providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    userContextValue?: Partial<typeof mockUserContextValue>;
  }
) => {
  const userValue = { ...mockUserContextValue, ...options?.userContextValue };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <UserProvider>{children}</UserProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };

// Test utilities
export const mockNavigationProp = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
};

export const mockRouteProp = {
  key: 'test-route',
  name: 'TestScreen',
  params: {},
  path: undefined,
};

// Helper function to create mock functions
export const createMockFn = <T extends (...args: any[]) => any>(
  implementation?: T
): jest.Mock => {
  return jest.fn(implementation);
};

// Helper to wait for async operations
export const waitFor = (callback: () => void, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    const checkCondition = () => {
      try {
        callback();
        resolve();
      } catch (error) {
        if (Date.now() - startTime >= timeout) {
          reject(error);
        } else {
          setTimeout(checkCondition, 50);
        }
      }
    };
    checkCondition();
  });
};
