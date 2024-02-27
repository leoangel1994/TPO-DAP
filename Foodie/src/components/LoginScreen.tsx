import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Screens} from '../navigation/RootNavigator';
import {PrimaryButton} from './PrimaryButton';
import {userLogin, storeUserSession} from '../api/ApiManager';
import {useIsFocused} from '@react-navigation/native';
import {ERROR_LOGIN, ErrorNavigate} from './Error/ErrorCodes';

async function GetAuthData(idtoken: string, setUserName: any) {
  let user: any = await userLogin(idtoken);
  let session: any = await storeUserSession(
    user.accessToken,
    user.refreshToken,
  );
  await setUserName(session.username);
}

function GoogleConfigure() {
  GoogleSignin.configure({
    webClientId:
      '668505742836-j257248c8cr7hbaupc1hqi7toufmdt00.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  });
}

async function Signin(setloggedIn: any, setUserName: any) {
  GoogleConfigure();

  const userInfo = await GoogleSignin.signIn();
  const token = await GoogleSignin.getTokens();
  await GetAuthData(token.idToken, setUserName);

  setloggedIn(true);
}

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const isFocused = useIsFocused();
  const [onlyOneTime, setOnlyOneTime] = useState(false);

  useEffect(() => {
    setloggedIn(false)
    if (onlyOneTime) {
      return;
    }
    setOnlyOneTime(true);
    if (isFocused) {
      setloggedIn(false);
      setUserName('');
    }
    const fetchLogInData = async () => {
      GoogleConfigure();
      await GoogleSignin.signInSilently();
      let isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const token = await GoogleSignin.getTokens();
        await GetAuthData(token.idToken, setUserName);
        navigation.replace(Screens.TabNavigator);
      }
    };

    fetchLogInData()
      .then(() => {
        console.log('OK');
      })
      .catch((error: any) => {
        console.log(error);
        setloggedIn(false);
        if (error?.code !== statusCodes.SIGN_IN_REQUIRED)
          ErrorNavigate(navigation, ERROR_LOGIN);
      });
  }, [isFocused]);
  return (
    <View style={styles.background}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
      </ScrollView>

      <View style={styles.buttonPosition}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => {
            Signin(setloggedIn, setUserName)
              .then(() => {
                navigation.replace(Screens.TabNavigator);
              })
              .catch((e: any) => {
                console.log(e);
                ErrorNavigate(navigation, ERROR_LOGIN);
                setloggedIn(false);
              });
          }}
          disabled={loggedIn}
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
