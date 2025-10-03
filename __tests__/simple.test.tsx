import React from 'react';

describe('Simple Setup Test', () => {
  it('should run basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle React components', () => {
    const element = React.createElement('div', null, 'Hello World');
    expect(element.type).toBe('div');
    expect(element.props.children).toBe('Hello World');
  });
});
