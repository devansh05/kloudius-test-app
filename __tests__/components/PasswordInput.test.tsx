import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { PasswordInput } from '../../app/components/password-input';
import { render } from '../test-utils';

describe('PasswordInput', () => {
  const defaultProps = {
    value: 'password123',
    isPasswordVisible: false,
    onToggleVisibility: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByDisplayValue, getByText } = render(
      <PasswordInput {...defaultProps} />
    );

    expect(getByDisplayValue('password123')).toBeTruthy();
    expect(getByText('👁️‍🗨️')).toBeTruthy(); // Hidden eye icon
  });

  it('shows password when isPasswordVisible is true', () => {
    const { getByDisplayValue, getByText } = render(
      <PasswordInput {...defaultProps} isPasswordVisible={true} />
    );

    const input = getByDisplayValue('password123');
    expect(input.props.secureTextEntry).toBe(false);
    expect(getByText('👁️')).toBeTruthy(); // Visible eye icon
  });

  it('hides password when isPasswordVisible is false', () => {
    const { getByDisplayValue, getByText } = render(
      <PasswordInput {...defaultProps} isPasswordVisible={false} />
    );

    const input = getByDisplayValue('password123');
    expect(input.props.secureTextEntry).toBe(true);
    expect(getByText('👁️‍🗨️')).toBeTruthy(); // Hidden eye icon
  });

  it('calls onToggleVisibility when eye button is pressed', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <PasswordInput {...defaultProps} onToggleVisibility={mockToggle} />
    );

    const eyeButton = getByText('👁️‍🗨️');
    fireEvent.press(eyeButton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('applies invalid styles when touched and invalid', () => {
    const { getByDisplayValue } = render(
      <PasswordInput {...defaultProps} valid={false} touched={true} />
    );

    const input = getByDisplayValue('password123');
    expect(input).toHaveStyle({
      backgroundColor: '#f9c0c0',
      borderColor: 'red',
    });
  });

  it('does not apply invalid styles when not touched', () => {
    const { getByDisplayValue } = render(
      <PasswordInput {...defaultProps} valid={false} touched={false} />
    );

    const input = getByDisplayValue('password123');
    // Should have default styles instead of invalid styles
    expect(input).toHaveStyle({
      flex: 1,
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
    });
  });

  it('applies default input styles', () => {
    const { getByDisplayValue } = render(<PasswordInput {...defaultProps} />);

    const input = getByDisplayValue('password123');
    expect(input).toHaveStyle({
      flex: 1,
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
      padding: 5,
      marginTop: 8,
      marginBottom: 8,
      paddingRight: 40,
    });
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <PasswordInput {...defaultProps} onChangeText={mockOnChangeText} />
    );

    const input = getByDisplayValue('password123');
    fireEvent.changeText(input, 'newpassword');

    expect(mockOnChangeText).toHaveBeenCalledWith('newpassword');
  });

  it('accepts additional TextInput props', () => {
    const { getByPlaceholderText } = render(
      <PasswordInput
        {...defaultProps}
        placeholder="Enter password"
        maxLength={20}
        autoCapitalize="none"
      />
    );

    const input = getByPlaceholderText('Enter password');
    expect(input).toBeTruthy();
    expect(input.props.maxLength).toBe(20);
    expect(input.props.autoCapitalize).toBe('none');
  });

  it('merges custom styles with default styles', () => {
    const customStyle = { fontSize: 16, color: 'blue' };
    const { getByDisplayValue } = render(
      <PasswordInput {...defaultProps} style={customStyle} />
    );

    const input = getByDisplayValue('password123');
    expect(input).toHaveStyle({
      ...customStyle,
      flex: 1,
      borderWidth: 1,
    });
  });

  describe('Eye icon toggle functionality', () => {
    it('toggles between visible and hidden states', () => {
      let isVisible = false;
      const mockToggle = jest.fn(() => {
        isVisible = !isVisible;
      });

      const { rerender, getByText } = render(
        <PasswordInput
          {...defaultProps}
          isPasswordVisible={isVisible}
          onToggleVisibility={mockToggle}
        />
      );

      // Initially hidden
      expect(getByText('👁️‍🗨️')).toBeTruthy();

      // Toggle to visible
      fireEvent.press(getByText('👁️‍🗨️'));
      expect(mockToggle).toHaveBeenCalled();

      // Re-render with visible state
      rerender(
        <PasswordInput
          {...defaultProps}
          isPasswordVisible={true}
          onToggleVisibility={mockToggle}
        />
      );

      expect(getByText('👁️')).toBeTruthy();
    });
  });
});
