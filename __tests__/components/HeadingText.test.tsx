import React from 'react';
import { HeadingText } from '../../app/components/heading-text';
import { render } from '../test-utils';

describe('HeadingText', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(<HeadingText>Test Heading</HeadingText>);

    expect(getByText('Test Heading')).toBeTruthy();
  });

  it('applies default heading styles', () => {
    const { getByText } = render(<HeadingText>Styled Heading</HeadingText>);

    const heading = getByText('Styled Heading');
    expect(heading).toHaveStyle({
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical: 10,
    });
  });

  it('merges custom styles with default styles', () => {
    const customStyle = { color: 'red', fontSize: 32 };
    const { getByText } = render(
      <HeadingText style={customStyle}>Custom Heading</HeadingText>
    );

    const heading = getByText('Custom Heading');
    expect(heading).toHaveStyle({
      ...customStyle,
      fontWeight: 'bold',
      marginVertical: 10,
    });
  });

  it('accepts additional Text props', () => {
    const { getByText } = render(
      <HeadingText numberOfLines={2} ellipsizeMode="tail" testID="heading-text">
        Long heading text that might be truncated
      </HeadingText>
    );

    const heading = getByText('Long heading text that might be truncated');
    expect(heading).toBeTruthy();
    expect(heading.props.numberOfLines).toBe(2);
    expect(heading.props.ellipsizeMode).toBe('tail');
    expect(heading.props.testID).toBe('heading-text');
  });

  it('renders with no children gracefully', () => {
    const { toJSON } = render(<HeadingText />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with multiple children', () => {
    const { getByText, toJSON } = render(
      <HeadingText>
        Part 1 <HeadingText>Part 2</HeadingText>
      </HeadingText>
    );

    // Check that Part 2 exists in its nested component
    expect(getByText('Part 2')).toBeTruthy();

    // Check that the component renders successfully with nested children
    expect(toJSON()).toBeTruthy();
  });
});
