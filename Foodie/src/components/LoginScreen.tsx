import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Screens} from '../navigation/RootNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';

async function pruebitaStoreUserSession() {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        age: 21,
        token: 'ACCESS_TOKEN',
        username: 'emeraldsanto',
        languages: ['fr', 'en', 'de'],
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

async function pruebitaRetrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    if (session !== undefined) {
      console.log(session);
    }
  } catch (error) {
    console.log(error);
  }
}

const LoginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
      </ScrollView>

      <View style={styles.buttonPosition}>
        {/*TODO: hacer lo de google sign in.*/}
        {/*TODO: https://github.com/react-native-google-signin/google-signin */}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => {
            pruebitaStoreUserSession()
              .then(() => pruebitaRetrieveUserSession())
              .catch(e => console.log(e));
            navigation.navigate(Screens.TabNavigator);
          }}
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
