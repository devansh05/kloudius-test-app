# Testing Guide

This document provides comprehensive information about testing in this React Native project using React Testing Library and Jest.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Testing Patterns](#testing-patterns)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)
- [Examples](#examples)

## Overview

This project uses:

- **Jest** as the test runner and testing framework
- **React Testing Library** for React Native component testing
- **Testing Library Jest Native** for additional custom matchers
- **Custom test utilities** for enhanced testing experience

## Getting Started

### Dependencies

The following testing dependencies are already installed:

```json
{
  "@testing-library/jest-native": "^5.4.3",
  "@testing-library/react-native": "^13.3.3",
  "@types/jest": "^30.0.0",
  "jest": "^30.2.0",
  "jest-environment-jsdom": "^30.2.0"
}
```

### Configuration

Jest is configured in `jest.config.js` with:

- React Native preset
- Custom setup files
- Coverage configuration
- Module path mapping
- Transform ignore patterns for Expo/React Native modules

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Using the Test Script

We provide a custom test script for enhanced testing experience:

```bash
# Show help
./scripts/test.sh help

# Run all tests
./scripts/test.sh all

# Run specific test suites
./scripts/test.sh components
./scripts/test.sh screens
./scripts/test.sh hooks

# Run tests in watch mode
./scripts/test.sh watch

# Run with coverage
./scripts/test.sh coverage

# Run CI pipeline (lint + format + test + coverage)
./scripts/test.sh ci
```

### Test Patterns

```bash
# Run tests matching a pattern
npm test -- --testPathPattern="Button"

# Run tests in a specific directory
npm test -- __tests__/components

# Run a specific test file
npm test -- ButtonWithBackground.test.tsx

# Update snapshots
npm test -- --updateSnapshot
```

## Test Structure

```
__tests__/
├── setup.ts                    # Global test setup
├── test-utils.tsx             # Custom render utilities
├── components/                # Component tests
│   ├── ButtonWithBackground.test.tsx
│   ├── DefaultInput.test.tsx
│   ├── HeadingText.test.tsx
│   └── PasswordInput.test.tsx
├── screens/                   # Screen tests
│   ├── LoginScreen.test.tsx
│   └── HomeScreen.test.tsx
└── hooks/                     # Hook tests
    ├── useLoginDetails.test.ts
    └── useHomeScreen.test.ts
```

## Testing Patterns

### Component Testing

```tsx
import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import { MyComponent } from '../../app/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('handles user interaction', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<MyComponent onPress={mockFn} />);

    fireEvent.press(getByText('Button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react-native';
import { useMyHook } from '../../app/hooks/useMyHook';

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(initialValue);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook());

    act(() => {
      result.current.setValue('new value');
    });

    expect(result.current.value).toBe('new value');
  });
});
```

### Screen Testing

```tsx
import React from 'react';
import { render } from '../test-utils';
import { MyScreen } from '../../app/screens/MyScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('MyScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyScreen />);
    expect(getByText('Screen Title')).toBeTruthy();
  });
});
```

## Best Practices

### 1. Use Descriptive Test Names

```tsx
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('displays error message when email is invalid', () => { ... });
```

### 2. Test User Behavior, Not Implementation

```tsx
// ❌ Bad - testing implementation details
expect(component.state.isVisible).toBe(true);

// ✅ Good - testing user-visible behavior
expect(getByText('Password is visible')).toBeTruthy();
```

### 3. Use the Custom Render Function

```tsx
// ✅ Use the custom render from test-utils
import { render } from '../test-utils';

// This provides necessary providers and context
const { getByText } = render(<MyComponent />);
```

### 4. Mock External Dependencies

```tsx
// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

// Mock custom hooks
jest.mock('../../app/hooks/useMyHook', () => ({
  useMyHook: () => mockHookReturn,
}));
```

### 5. Clean Up After Tests

```tsx
describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Reset any modified global state
  });
});
```

### 6. Use Proper Assertions

```tsx
// ✅ Use specific matchers
expect(button).toBeDisabled();
expect(input).toHaveDisplayValue('test@example.com');
expect(text).toHaveStyle({ color: 'red' });

// ✅ Use meaningful error messages
expect(result).toBe(expected, 'Should calculate correct total');
```

## Common Issues

### 1. Module Resolution Issues

If you encounter module resolution errors, check:

- `transformIgnorePatterns` in `jest.config.js`
- Module paths and aliases
- Proper mocking of React Native modules

### 2. Async Testing Issues

```tsx
// ✅ Wait for async operations
await waitFor(() => {
  expect(getByText('Loaded data')).toBeTruthy();
});

// ✅ Use findBy queries for async elements
const element = await findByText('Async content');
```

### 3. Timer Issues

```tsx
// Use fake timers when testing time-dependent code
jest.useFakeTimers();

// Fast-forward timers
act(() => {
  jest.advanceTimersByTime(1000);
});

jest.useRealTimers();
```

### 4. Navigation Testing

```tsx
// Mock the entire navigation module
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));
```

## Examples

### Testing Form Validation

```tsx
it('shows validation error for invalid email', () => {
  const { getByPlaceholderText, getByText } = render(<LoginForm />);

  const emailInput = getByPlaceholderText('Email');

  fireEvent.changeText(emailInput, 'invalid-email');
  fireEvent(emailInput, 'blur');

  expect(getByText('Please enter a valid email')).toBeTruthy();
});
```

### Testing Context Usage

```tsx
it('displays user information when authenticated', () => {
  const { getByText } = render(<UserProfile />, {
    userContextValue: {
      isAuthenticated: true,
      authData: { email: 'test@example.com' },
    },
  });

  expect(getByText('test@example.com')).toBeTruthy();
});
```

### Testing Error Boundaries

```tsx
it('handles errors gracefully', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  const { getByText } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(getByText('Something went wrong')).toBeTruthy();
});
```

## Coverage Goals

The project is configured with coverage thresholds:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Run `npm run test:coverage` to see detailed coverage reports.

## Debugging Tests

### 1. Using Console Output

```tsx
// Enable console output during tests
process.env.DEBUG_TESTS = 'true';
```

### 2. Using screen.debug()

```tsx
import { screen } from '@testing-library/react-native';

it('debugs component output', () => {
  render(<MyComponent />);
  screen.debug(); // Prints component tree
});
```

### 3. Running Specific Tests

```bash
# Run only failing tests
npm test -- --onlyFailures

# Run tests matching a pattern
npm test -- --testNamePattern="validation"
```

## Contributing

When adding new tests:

1. Follow the existing test structure
2. Use descriptive test names
3. Test user behavior, not implementation
4. Add proper setup and cleanup
5. Ensure tests are deterministic
6. Update this documentation if needed

For questions or issues with testing, please refer to:

- [React Testing Library docs](https://testing-library.com/docs/react-native-testing-library/intro)
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing docs](https://reactnative.dev/docs/testing-overview)
