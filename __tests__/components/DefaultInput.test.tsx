import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { DefaultInput } from '../../app/components/default-input';
import { render } from '../test-utils';

describe('DefaultInput', () => {
  it('renders correctly with default props', () => {
    const { getByDisplayValue } = render(<DefaultInput value="test input" />);

    expect(getByDisplayValue('test input')).toBeTruthy();
  });

  it('applies default styles', () => {
    const { getByDisplayValue } = render(<DefaultInput value="test" />);

    const input = getByDisplayValue('test');
    expect(input).toHaveStyle({
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
      padding: 5,
      marginTop: 8,
      marginBottom: 8,
    });
  });

  it('applies invalid styles when touched and invalid', () => {
    const { getByDisplayValue } = render(
      <DefaultInput value="invalid input" valid={false} touched={true} />
    );

    const input = getByDisplayValue('invalid input');
    expect(input).toHaveStyle({
      backgroundColor: '#f9c0c0',
      borderColor: 'red',
    });
  });

  it('does not apply invalid styles when not touched', () => {
    const { getByDisplayValue } = render(
      <DefaultInput value="invalid input" valid={false} touched={false} />
    );

    const input = getByDisplayValue('invalid input');
    // Should have default styles instead of invalid styles
    expect(input).toHaveStyle({
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
    });
  });

  it('does not apply invalid styles when valid', () => {
    const { getByDisplayValue } = render(
      <DefaultInput value="valid input" valid={true} touched={true} />
    );

    const input = getByDisplayValue('valid input');
    // Should have default styles instead of invalid styles
    expect(input).toHaveStyle({
      width: '100%',
      borderWidth: 1,
      borderColor: '#eee',
    });
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <DefaultInput value="initial" onChangeText={mockOnChangeText} />
    );

    const input = getByDisplayValue('initial');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('accepts additional TextInput props', () => {
    const { getByPlaceholderText } = render(
      <DefaultInput
        placeholder="Enter text here"
        maxLength={10}
        autoCapitalize="words"
      />
    );

    const input = getByPlaceholderText('Enter text here');
    expect(input).toBeTruthy();
    expect(input.props.maxLength).toBe(10);
    expect(input.props.autoCapitalize).toBe('words');
  });

  it('merges custom styles with default styles', () => {
    const customStyle = { fontSize: 18, color: 'blue' };
    const { getByDisplayValue } = render(
      <DefaultInput value="styled input" style={customStyle} />
    );

    const input = getByDisplayValue('styled input');
    expect(input).toHaveStyle({
      ...customStyle,
      width: '100%',
      borderWidth: 1,
    });
  });
});
