import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Screens} from '../navigation/RootNavigator';

const LoginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
      </ScrollView>

      <View style={styles.buttonPosition}>
        {/*TODO: hacer lo de google sign in.*/} 
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => navigation.navigate(Screens.TabNavigator)}
          /* disabled={this.state.isSigninInProgress}*/
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,
  titleText: CommonStyle.titleText,
  buttonPosition: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
});

export default LoginScreen;
