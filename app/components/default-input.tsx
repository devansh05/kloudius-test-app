import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface DefaultInputProps extends TextInputProps {
  valid?: boolean;
  touched?: boolean;
}

export const DefaultInput: React.FC<DefaultInputProps> = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null,
    ]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
  },
});
