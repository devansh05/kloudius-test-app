import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { HomeScreen } from '../../app/screens/home-screen/view';
import { render } from '../test-utils';

// Mock the useHomeScreen hook
const mockUseHomeScreen = {
  handleLogout: jest.fn(),
  authData: null as any,
  authMode: null as any,
  isAuthenticated: false,
};

jest.mock('../../app/screens/home-screen/use-home-screen', () => ({
  useHomeScreen: () => mockUseHomeScreen,
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with basic elements', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('HOME SCREEN')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('does not show user details when not authenticated', () => {
    mockUseHomeScreen.isAuthenticated = false;
    mockUseHomeScreen.authData = null;

    const { queryByText } = render(<HomeScreen />);

    expect(queryByText('User Details:')).toBeNull();
    expect(queryByText('Status: Authenticated')).toBeNull();
  });

  it('shows user details when authenticated', () => {
    mockUseHomeScreen.isAuthenticated = true;
    mockUseHomeScreen.authData = {
      email: 'test@example.com',
      password: 'password123',
    };
    mockUseHomeScreen.authMode = 'login';

    const { getByText } = render(<HomeScreen />);

    expect(getByText('User Details:')).toBeTruthy();
    expect(getByText('Email: test@example.com')).toBeTruthy();
    expect(getByText('Auth Mode: Login')).toBeTruthy();
    expect(getByText('Status: Authenticated')).toBeTruthy();
  });

  it('shows correct auth mode for signup', () => {
    mockUseHomeScreen.isAuthenticated = true;
    mockUseHomeScreen.authData = {
      email: 'signup@example.com',
      password: 'password123',
    };
    mockUseHomeScreen.authMode = 'signup';

    const { getByText } = render(<HomeScreen />);

    expect(getByText('Auth Mode: Sign Up')).toBeTruthy();
  });

  it('calls handleLogout when logout button is pressed', () => {
    const { getByText } = render(<HomeScreen />);

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(mockUseHomeScreen.handleLogout).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles to container', () => {
    const { getByText } = render(<HomeScreen />);

    const homeTitle = getByText('HOME SCREEN');
    expect(homeTitle).toHaveStyle({
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical: 10,
    });
  });

  it('renders user details container with correct styles when authenticated', () => {
    mockUseHomeScreen.isAuthenticated = true;
    mockUseHomeScreen.authData = {
      email: 'test@example.com',
      password: 'password123',
    };
    mockUseHomeScreen.authMode = 'login';

    const { getByText } = render(<HomeScreen />);

    const sectionTitle = getByText('User Details:');
    expect(sectionTitle).toHaveStyle({
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
    });

    const emailText = getByText('Email: test@example.com');
    expect(emailText).toHaveStyle({
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
      textAlign: 'center',
    });
  });

  it('does not show user details when authenticated but authData is null', () => {
    mockUseHomeScreen.isAuthenticated = true;
    mockUseHomeScreen.authData = null;
    mockUseHomeScreen.authMode = 'login';

    const { queryByText } = render(<HomeScreen />);

    expect(queryByText('User Details:')).toBeNull();
  });

  it('handles different email addresses correctly', () => {
    mockUseHomeScreen.isAuthenticated = true;
    mockUseHomeScreen.authData = {
      email: 'another.user@test.com',
      password: 'password123',
    };
    mockUseHomeScreen.authMode = 'signup';

    const { getByText } = render(<HomeScreen />);

    expect(getByText('Email: another.user@test.com')).toBeTruthy();
  });

  afterEach(() => {
    // Reset to default values after each test
    mockUseHomeScreen.isAuthenticated = false;
    mockUseHomeScreen.authData = null;
    mockUseHomeScreen.authMode = null;
  });
});
