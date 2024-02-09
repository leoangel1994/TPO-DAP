import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../Theme';

const LandingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.text}>Soy la landing!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.PRIMARY_1,
    paddingHorizontal: 24,
    fontSize: 48,
  },
});

export default LandingScreen;
