import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ButtonWithBackground } from '../../app/components/button-with-background';
import { render } from '../test-utils';

describe('ButtonWithBackground', () => {
  const defaultProps = {
    color: '#007AFF',
    children: 'Test Button',
  };

  it('renders correctly with default props', () => {
    const { getByText } = render(<ButtonWithBackground {...defaultProps} />);

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders correctly when disabled', () => {
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} disabled />
    );

    const button = getByText('Test Button');
    expect(button).toBeTruthy();
    expect(button).toHaveStyle({ color: '#aaa' });
  });

  it('calls onPress when pressed and not disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with touchable components even when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} onPress={mockOnPress} disabled />
    );

    // When disabled, the component should still render the touchable wrapper
    // but the onPress should not be called when pressed
    const button = getByText('Test Button');
    expect(button).toBeTruthy();

    // Verify that the component renders the disabled styles
    expect(button).toHaveStyle({ color: '#aaa' });

    // Verify that the component has the disabled background styles
    expect(button.parent).toHaveStyle({
      backgroundColor: '#eee',
      borderColor: '#aaa',
    });
  });

  it('does not call onPress when pressed and disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} onPress={mockOnPress} disabled />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom background color', () => {
    const customColor = '#FF0000';
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} color={customColor} />
    );

    const button = getByText('Test Button');
    expect(button.parent).toHaveStyle({ backgroundColor: customColor });
  });

  it('applies disabled styles when disabled', () => {
    const { getByText } = render(
      <ButtonWithBackground {...defaultProps} disabled />
    );

    const button = getByText('Test Button');
    expect(button.parent).toHaveStyle({
      backgroundColor: '#eee',
      borderColor: '#aaa',
    });
  });

  describe('Platform-specific rendering', () => {
    const originalPlatform = require('react-native').Platform.OS;

    afterEach(() => {
      require('react-native').Platform.OS = originalPlatform;
    });

    it('renders TouchableNativeFeedback on Android', () => {
      require('react-native').Platform.OS = 'android';

      const { getByText } = render(<ButtonWithBackground {...defaultProps} />);

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('renders TouchableOpacity on iOS', () => {
      require('react-native').Platform.OS = 'ios';

      const { getByText } = render(<ButtonWithBackground {...defaultProps} />);

      expect(getByText('Test Button')).toBeTruthy();
    });
  });
});
