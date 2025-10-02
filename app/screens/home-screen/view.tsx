import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ButtonWithBackground, HeadingText } from '../../components';
import { useHomeScreen } from './use-home-screen';

export const HomeScreen = () => {
  const { handleLogout, authData, authMode, isAuthenticated } = useHomeScreen();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <HeadingText>{'HOME SCREEN'}</HeadingText>

      {isAuthenticated && authData && (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.sectionTitle}>User Details:</Text>
          <Text style={styles.detailText}>Email: {authData.email}</Text>
          <Text style={styles.detailText}>
            Auth Mode: {authMode === 'login' ? 'Login' : 'Sign Up'}
          </Text>
          <Text style={styles.detailText}>Status: Authenticated</Text>
        </View>
      )}

      <ButtonWithBackground color="#ff4444" onPress={handleLogout}>
        Logout
      </ButtonWithBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userDetailsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 250,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
    textAlign: 'center',
  },
});
