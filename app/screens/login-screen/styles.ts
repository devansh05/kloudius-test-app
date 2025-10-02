import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});

export default styles;
