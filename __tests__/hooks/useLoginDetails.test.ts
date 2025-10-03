import { act, renderHook } from '@testing-library/react-native';
import { useLoginDetails } from '../../app/screens/login-screen/use-login-details';

// Mock the useUserContext hook
const mockSaveUserAuthDetails = jest.fn();
jest.mock('../../app/context/user-context', () => ({
  useUserContext: () => ({
    saveUserAuthDetails: mockSaveUserAuthDetails,
  }),
}));

describe('useLoginDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useLoginDetails());

    expect(result.current.authMode).toBe('login');
    expect(result.current.isPasswordVisible).toBe(false);
    expect(result.current.isConfirmPasswordVisible).toBe(false);
    expect(result.current.isSubmitDisabled).toBe(true);

    // Check initial controls state
    expect(result.current.controls.email.value).toBe('');
    expect(result.current.controls.email.valid).toBe(false);
    expect(result.current.controls.email.touched).toBe(false);
    expect(result.current.controls.email.validationRules).toEqual({
      isEmail: true,
    });

    expect(result.current.controls.password.value).toBe('');
    expect(result.current.controls.password.valid).toBe(false);
    expect(result.current.controls.password.touched).toBe(false);
    expect(result.current.controls.password.validationRules).toEqual({
      minLength: 6,
    });

    expect(result.current.controls.confirmPassword.value).toBe('');
    expect(result.current.controls.confirmPassword.valid).toBe(false);
    expect(result.current.controls.confirmPassword.touched).toBe(false);
    expect(result.current.controls.confirmPassword.validationRules).toEqual({
      equalTo: 'password',
    });
  });

  it('toggles auth mode correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    expect(result.current.authMode).toBe('login');

    act(() => {
      result.current.switchAuthModeHandler();
    });

    expect(result.current.authMode).toBe('signup');

    act(() => {
      result.current.switchAuthModeHandler();
    });

    expect(result.current.authMode).toBe('login');
  });

  it('toggles password visibility correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    expect(result.current.isPasswordVisible).toBe(false);

    act(() => {
      result.current.togglePasswordVisibility();
    });

    expect(result.current.isPasswordVisible).toBe(true);

    act(() => {
      result.current.togglePasswordVisibility();
    });

    expect(result.current.isPasswordVisible).toBe(false);
  });

  it('toggles confirm password visibility correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    expect(result.current.isConfirmPasswordVisible).toBe(false);

    act(() => {
      result.current.toggleConfirmPasswordVisibility();
    });

    expect(result.current.isConfirmPasswordVisible).toBe(true);

    act(() => {
      result.current.toggleConfirmPasswordVisibility();
    });

    expect(result.current.isConfirmPasswordVisible).toBe(false);
  });

  it('updates input state correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    act(() => {
      result.current.updateInputState('email', 'test@example.com');
    });

    expect(result.current.controls.email.value).toBe('test@example.com');
    expect(result.current.controls.email.touched).toBe(true);
    expect(result.current.controls.email.valid).toBe(true);

    act(() => {
      result.current.updateInputState('password', 'password123');
    });

    expect(result.current.controls.password.value).toBe('password123');
    expect(result.current.controls.password.touched).toBe(true);
    expect(result.current.controls.password.valid).toBe(true);
  });

  it('validates email correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    // Invalid email
    act(() => {
      result.current.updateInputState('email', 'invalid-email');
    });

    expect(result.current.controls.email.valid).toBe(false);

    // Valid email
    act(() => {
      result.current.updateInputState('email', 'valid@example.com');
    });

    expect(result.current.controls.email.valid).toBe(true);
  });

  it('validates password length correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    // Short password
    act(() => {
      result.current.updateInputState('password', '123');
    });

    expect(result.current.controls.password.valid).toBe(false);

    // Valid password
    act(() => {
      result.current.updateInputState('password', 'password123');
    });

    expect(result.current.controls.password.valid).toBe(true);
  });

  it('validates confirm password correctly', () => {
    const { result } = renderHook(() => useLoginDetails());

    // Set password first
    act(() => {
      result.current.updateInputState('password', 'password123');
    });

    // Non-matching confirm password
    act(() => {
      result.current.updateInputState('confirmPassword', 'different');
    });

    expect(result.current.controls.confirmPassword.valid).toBe(false);

    // Matching confirm password
    act(() => {
      result.current.updateInputState('confirmPassword', 'password123');
    });

    expect(result.current.controls.confirmPassword.valid).toBe(true);
  });

  it('enables submit when all fields are valid in login mode', () => {
    const { result } = renderHook(() => useLoginDetails());

    expect(result.current.isSubmitDisabled).toBe(true);

    act(() => {
      result.current.updateInputState('email', 'test@example.com');
      result.current.updateInputState('password', 'password123');
    });

    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it('enables submit when all fields are valid in signup mode', () => {
    const { result } = renderHook(() => useLoginDetails());

    act(() => {
      result.current.switchAuthModeHandler(); // Switch to signup
      result.current.updateInputState('email', 'test@example.com');
      result.current.updateInputState('password', 'password123');
      result.current.updateInputState('confirmPassword', 'password123');
    });

    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it('keeps submit disabled when confirm password does not match in signup mode', () => {
    const { result } = renderHook(() => useLoginDetails());

    act(() => {
      result.current.switchAuthModeHandler(); // Switch to signup
      result.current.updateInputState('email', 'test@example.com');
      result.current.updateInputState('password', 'password123');
      result.current.updateInputState('confirmPassword', 'different');
    });

    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it('calls saveUserAuthDetails when auth handler is called with valid data', () => {
    const { result } = renderHook(() => useLoginDetails());

    act(() => {
      result.current.updateInputState('email', 'test@example.com');
      result.current.updateInputState('password', 'password123');
    });

    act(() => {
      result.current.authHandler();
    });

    expect(mockSaveUserAuthDetails).toHaveBeenCalledWith(
      {
        email: 'test@example.com',
        password: 'password123',
      },
      'login'
    );
  });

  it('resets confirm password when switching from signup to login', () => {
    const { result } = renderHook(() => useLoginDetails());

    act(() => {
      result.current.switchAuthModeHandler(); // Switch to signup
      result.current.updateInputState('confirmPassword', 'test123');
    });

    expect(result.current.controls.confirmPassword.value).toBe('test123');

    act(() => {
      result.current.switchAuthModeHandler(); // Switch back to login
    });

    expect(result.current.controls.confirmPassword.value).toBe('');
    expect(result.current.controls.confirmPassword.touched).toBe(false);
  });
});
