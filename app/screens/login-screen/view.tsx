import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ButtonWithBackground,
  DefaultInput,
  HeadingText,
  PasswordInput,
} from '../../components';
import styles from './styles';
import { useLoginDetails } from './use-login-details';

export const LoginScreen = () => {
  const {
    authMode,
    controls,
    switchAuthModeHandler,
    authHandler,
    isSubmitDisabled,
    updateInputState,
    isPasswordVisible,
    isConfirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useLoginDetails();

  const confirmPasswordControl = (
    <View style={styles.portraitPasswordWrapper}>
      <PasswordInput
        placeholder="Confirm Password"
        style={styles.input}
        value={controls.confirmPassword.value}
        onChangeText={val => updateInputState('confirmPassword', val)}
        valid={controls.confirmPassword.valid}
        touched={controls.confirmPassword.touched}
        isPasswordVisible={isConfirmPasswordVisible}
        onToggleVisibility={toggleConfirmPasswordVisibility}
      />
    </View>
  );

  const submitButton = (
    <ButtonWithBackground
      color="#fff"
      onPress={authHandler}
      disabled={isSubmitDisabled}
    >
      Submit
    </ButtonWithBackground>
  );
  return (
    <KeyboardAvoidingView>
      <HeadingText>{authMode === 'login' ? 'Login' : 'Sign Up'}</HeadingText>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <DefaultInput
            placeholder="Your E-Mail Address"
            style={styles.input}
            value={controls.email.value}
            onChangeText={val => updateInputState('email', val)}
            valid={controls.email.valid}
            touched={controls.email.touched}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <View style={styles.portraitPasswordContainer}>
            <View style={styles.portraitPasswordWrapper}>
              <PasswordInput
                placeholder="Password"
                style={styles.input}
                value={controls.password.value}
                onChangeText={val => updateInputState('password', val)}
                valid={controls.password.valid}
                touched={controls.password.touched}
                isPasswordVisible={isPasswordVisible}
                onToggleVisibility={togglePasswordVisibility}
              />
            </View>
            <View>{authMode === 'signup' && confirmPasswordControl}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {submitButton}
      <ButtonWithBackground color="#fff" onPress={switchAuthModeHandler}>
        Switch to {authMode === 'login' ? 'Sign Up' : 'Login'}
      </ButtonWithBackground>
    </KeyboardAvoidingView>
  );
};
