import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

interface ButtonWithBackgroundProps {
  color: string;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export const ButtonWithBackground: React.FC<
  ButtonWithBackgroundProps
> = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null,
      ]}
    >
      <Text style={props.disabled ? styles.disabledText : null}>
        {props.children}
      </Text>
    </View>
  );

  const handlePress = () => {
    if (!props.disabled && props.onPress) {
      props.onPress();
    }
  };

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={handlePress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity onPress={handlePress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    alignContent: 'center',
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
  },
  disabledText: {
    color: '#aaa',
  },
});
