import { act, renderHook } from '@testing-library/react-native';
import { useHomeScreen } from '../../app/screens/home-screen/use-home-screen';

// Mock the useUserContext hook
const mockClearUserAuth = jest.fn();
const mockAuthData = {
  email: 'test@example.com',
  password: 'password123',
};

const mockUseUserContext = {
  clearUserAuth: mockClearUserAuth,
  authData: mockAuthData as any,
  authMode: 'login' as any,
  isAuthenticated: true,
};

jest.mock('../../app/context/user-context', () => ({
  useUserContext: () => mockUseUserContext,
}));

// Mock console.log
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('useHomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('returns correct values from user context', () => {
    const { result } = renderHook(() => useHomeScreen());

    expect(result.current.authData).toEqual(mockAuthData);
    expect(result.current.authMode).toBe('login');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('provides handleLogout function', () => {
    const { result } = renderHook(() => useHomeScreen());

    expect(typeof result.current.handleLogout).toBe('function');
  });

  it('calls clearUserAuth when handleLogout is called', () => {
    const { result } = renderHook(() => useHomeScreen());

    act(() => {
      result.current.handleLogout();
    });

    expect(mockClearUserAuth).toHaveBeenCalledTimes(1);
  });

  it('logs isAuthenticated value', () => {
    renderHook(() => useHomeScreen());

    expect(consoleSpy).toHaveBeenCalledWith('isAuthenticated', true);
  });

  describe('with different authentication states', () => {
    it('handles unauthenticated state', () => {
      // Temporarily modify the mock
      const originalIsAuthenticated = mockUseUserContext.isAuthenticated;
      const originalAuthData = mockUseUserContext.authData;

      mockUseUserContext.isAuthenticated = false;
      mockUseUserContext.authData = null;

      const { result } = renderHook(() => useHomeScreen());

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.authData).toBe(null);

      // Restore original values
      mockUseUserContext.isAuthenticated = originalIsAuthenticated;
      mockUseUserContext.authData = originalAuthData;
    });

    it('handles signup auth mode', () => {
      // Temporarily modify the mock
      const originalAuthMode = mockUseUserContext.authMode;

      mockUseUserContext.authMode = 'signup';

      const { result } = renderHook(() => useHomeScreen());

      expect(result.current.authMode).toBe('signup');

      // Restore original value
      mockUseUserContext.authMode = originalAuthMode;
    });

    it('handles different auth data', () => {
      // Temporarily modify the mock
      const originalAuthData = mockUseUserContext.authData;
      const newAuthData = {
        email: 'different@example.com',
        password: 'different123',
      };

      mockUseUserContext.authData = newAuthData;

      const { result } = renderHook(() => useHomeScreen());

      expect(result.current.authData).toEqual(newAuthData);

      // Restore original value
      mockUseUserContext.authData = originalAuthData;
    });
  });

  it('does not throw error when clearUserAuth is undefined', () => {
    // Temporarily modify the mock
    const originalClearUserAuth = mockUseUserContext.clearUserAuth;

    mockUseUserContext.clearUserAuth = undefined as any;

    const { result } = renderHook(() => useHomeScreen());

    expect(() => {
      act(() => {
        result.current.handleLogout();
      });
    }).not.toThrow();

    // Restore original value
    mockUseUserContext.clearUserAuth = originalClearUserAuth;
  });

  it('returns fresh values on each render', () => {
    const { result, rerender } = renderHook(() => useHomeScreen());

    const firstResult = { ...result.current };

    rerender({});

    // Values should be consistent but functions should be the same reference
    expect(result.current.authData).toEqual(firstResult.authData);
    expect(result.current.authMode).toBe(firstResult.authMode);
    expect(result.current.isAuthenticated).toBe(firstResult.isAuthenticated);
    expect(result.current.handleLogout).toBe(firstResult.handleLogout);
  });
});
