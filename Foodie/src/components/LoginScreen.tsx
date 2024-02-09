import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Theme from '../../Theme';

const LoginScreen = () => {
  return (
    <View style={styles.background}>
      <View>
        <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
        <Text style={styles.subtitleText}>Esta linea es de prueba de fuente nomas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    fontFamily: Theme.fontFamily.BOLD,
    padding: 30,
    color: Theme.colors.NEUTRAL_4,
    fontSize: Theme.fontSize.TITLE,
  },
  subtitleText: {
    fontFamily: Theme.fontFamily.REGULAR,
    padding: 30,
    color: Theme.colors.NEUTRAL_4,
    fontSize: Theme.fontSize.SUBTITLE,
  },
});

export default LoginScreen;
