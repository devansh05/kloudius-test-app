# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Testing

This project includes comprehensive testing setup with React Testing Library and Jest.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Use the custom test script for more options
./scripts/test.sh help
```

### Test Structure

- **Component Tests**: Testing individual UI components
- **Screen Tests**: Testing complete screen functionality
- **Hook Tests**: Testing custom React hooks
- **Integration Tests**: Testing component interactions

For detailed testing documentation, see [TESTING.md](./TESTING.md).

### Coverage

The project maintains high test coverage standards:

- Branches: 80%+
- Functions: 80%+
- Lines: 80%+
- Statements: 80%+

## Code Quality

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Check code formatting
npm run format:check

# Auto-fix formatting
npm run format
```

### CI Pipeline

```bash
# Run complete CI pipeline (lint + format + test + coverage)
./scripts/test.sh ci
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
