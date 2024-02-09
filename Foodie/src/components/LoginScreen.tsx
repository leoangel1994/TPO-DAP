import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {useLinkTo} from '@react-navigation/native';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.background}>
      <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
      <View style={styles.buttonPosition}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => linkTo("/Landing")}
          /* disabled={this.state.isSigninInProgress}*/
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: CommonStyle.titleText,
  buttonPosition: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
});

export default LoginScreen;
