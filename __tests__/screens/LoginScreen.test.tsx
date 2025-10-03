import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { LoginScreen } from '../../app/screens/login-screen/view';
import { render } from '../test-utils';

// Mock the useLoginDetails hook
const mockUseLoginDetails = {
  authMode: 'login' as 'login' | 'signup',
  controls: {
    email: {
      value: '',
      valid: false,
      validationRules: { isEmail: true },
      touched: false,
    },
    password: {
      value: '',
      valid: false,
      validationRules: { minLength: 6 },
      touched: false,
    },
    confirmPassword: {
      value: '',
      valid: false,
      validationRules: { equalTo: 'password' },
      touched: false,
    },
  },
  switchAuthModeHandler: jest.fn(),
  authHandler: jest.fn(),
  isSubmitDisabled: true,
  updateInputState: jest.fn(),
  isPasswordVisible: false,
  isConfirmPasswordVisible: false,
  togglePasswordVisibility: jest.fn(),
  toggleConfirmPasswordVisibility: jest.fn(),
};

jest.mock('../../app/screens/login-screen/use-login-details', () => ({
  useLoginDetails: () => mockUseLoginDetails,
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock state before each test
    mockUseLoginDetails.authMode = 'login';
    mockUseLoginDetails.isPasswordVisible = false;
    mockUseLoginDetails.isConfirmPasswordVisible = false;
    mockUseLoginDetails.isSubmitDisabled = true;
    mockUseLoginDetails.controls = {
      email: {
        value: '',
        valid: false,
        validationRules: { isEmail: true },
        touched: false,
      },
      password: {
        value: '',
        valid: false,
        validationRules: { minLength: 6 },
        touched: false,
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: { equalTo: 'password' },
        touched: false,
      },
    };
  });

  it('renders login mode correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Your E-Mail Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    expect(getByText('Switch to Sign Up')).toBeTruthy();
  });

  it('renders signup mode correctly', () => {
    mockUseLoginDetails.authMode = 'signup';

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByPlaceholderText('Your E-Mail Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    expect(getByText('Switch to Login')).toBeTruthy();
  });

  it('does not show confirm password field in login mode', () => {
    mockUseLoginDetails.authMode = 'login';

    const { queryByPlaceholderText } = render(<LoginScreen />);

    expect(queryByPlaceholderText('Confirm Password')).toBeNull();
  });

  it('shows confirm password field in signup mode', () => {
    mockUseLoginDetails.authMode = 'signup';

    const { getByPlaceholderText } = render(<LoginScreen />);

    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('calls updateInputState when email input changes', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Your E-Mail Address');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(mockUseLoginDetails.updateInputState).toHaveBeenCalledWith(
      'email',
      'test@example.com'
    );
  });

  it('calls updateInputState when password input changes', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');

    expect(mockUseLoginDetails.updateInputState).toHaveBeenCalledWith(
      'password',
      'password123'
    );
  });

  it('calls updateInputState when confirm password input changes in signup mode', () => {
    mockUseLoginDetails.authMode = 'signup';

    const { getByPlaceholderText } = render(<LoginScreen />);

    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(mockUseLoginDetails.updateInputState).toHaveBeenCalledWith(
      'confirmPassword',
      'password123'
    );
  });

  it('calls authHandler when submit button is pressed', () => {
    mockUseLoginDetails.isSubmitDisabled = false;

    const { getByText } = render(<LoginScreen />);

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(mockUseLoginDetails.authHandler).toHaveBeenCalled();
  });

  it('calls switchAuthModeHandler when switch button is pressed', () => {
    const { getByText } = render(<LoginScreen />);

    const switchButton = getByText('Switch to Sign Up');
    fireEvent.press(switchButton);

    expect(mockUseLoginDetails.switchAuthModeHandler).toHaveBeenCalled();
  });

  it('calls togglePasswordVisibility when password eye button is pressed', () => {
    const { getByText } = render(<LoginScreen />);

    const eyeButton = getByText('👁️‍🗨️');
    fireEvent.press(eyeButton);

    expect(mockUseLoginDetails.togglePasswordVisibility).toHaveBeenCalled();
  });

  it('shows password when isPasswordVisible is true', () => {
    mockUseLoginDetails.isPasswordVisible = true;

    const { getByText } = render(<LoginScreen />);

    expect(getByText('👁️')).toBeTruthy();
  });

  it('disables submit button when isSubmitDisabled is true', () => {
    mockUseLoginDetails.isSubmitDisabled = true;

    const { getByText } = render(<LoginScreen />);

    const submitButton = getByText('Submit');
    // The button is disabled, but we can still press it to verify it doesn't call the handler
    fireEvent.press(submitButton);

    expect(mockUseLoginDetails.authHandler).not.toHaveBeenCalled();
  });

  it('applies invalid styles to email input when invalid and touched', () => {
    mockUseLoginDetails.controls.email = {
      ...mockUseLoginDetails.controls.email,
      valid: false,
      touched: true,
    };

    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Your E-Mail Address');
    expect(emailInput).toHaveStyle({
      backgroundColor: '#f9c0c0',
      borderColor: 'red',
    });
  });

  it('has correct email input attributes', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Your E-Mail Address');
    expect(emailInput.props.autoCapitalize).toBe('none');
    expect(emailInput.props.autoCorrect).toBe(false);
    expect(emailInput.props.keyboardType).toBe('email-address');
  });
});
