import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const HeadingText: React.FC<TextProps> = props => (
  <Text {...props} style={[styles.textHeading, props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
