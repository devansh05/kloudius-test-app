import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface PasswordInputProps extends TextInputProps {
  valid?: boolean;
  touched?: boolean;
  isPasswordVisible: boolean;
  onToggleVisibility: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  valid,
  touched,
  isPasswordVisible,
  onToggleVisibility,
  style,
  ...textInputProps
}) => (
  <View style={styles.container}>
    <TextInput
      underlineColorAndroid="transparent"
      {...textInputProps}
      secureTextEntry={!isPasswordVisible}
      style={[styles.input, style, !valid && touched ? styles.invalid : null]}
    />
    <TouchableOpacity
      style={styles.eyeButton}
      onPress={onToggleVisibility}
      activeOpacity={0.7}
    >
      <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    paddingRight: 40, // Make space for the eye icon
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  eyeIcon: {
    fontSize: 18,
  },
});
