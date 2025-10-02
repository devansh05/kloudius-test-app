import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './context';
import { useUserContext } from './context/user-context';
import { HomeScreen } from './screens/home-screen';
import { LoginScreen } from './screens/login-screen';

const AppContent = () => {
  const userContext = useUserContext();
  const { isAuthenticated, isLoading } = userContext;
  console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? <HomeScreen /> : <LoginScreen />}
    </View>
  );
};

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});
