import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';
import {Screens} from '../navigation/RootNavigator';
import {PrimaryButton} from './PrimaryButton';
import {userLogin, storeUserSession} from '../api/ApiManager';



async function GetAuthData(idtoken: string, setUserName: any) {
  try {
    let user: any = await userLogin(idtoken);
    let session: any = await storeUserSession(user.accessToken, user.refreshToken);
    await setUserName(session.username);
  } catch (error) {console.log(error);}
};

function GoogleConfigure(){
  GoogleSignin.configure({
      webClientId: '668505742836-j257248c8cr7hbaupc1hqi7toufmdt00.apps.googleusercontent.com' // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  });
}

async function Signin(setloggedIn: any, setUserName: any) {
  GoogleConfigure();  
  
  try {
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      await GetAuthData(token.idToken, setUserName);

      setloggedIn(true);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error + ' SIGN_IN_CANCELLED');// user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error + ' IN_PROGRESS');// operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error + ' PLAY_SERVICES_NOT_AVAILABLE');// play services not available or outdated
      } else {
        console.log(error);// some other error happened
      }
    }
};

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchLogInData = async () => {
      GoogleConfigure();
      await GoogleSignin.signInSilently();
      let isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn){
        const token = await GoogleSignin.getTokens();
        await GetAuthData(token.idToken, setUserName);
        navigation.navigate(Screens.TabNavigator);}
    };
    fetchLogInData().catch((error: Error) => {console.log(error); setloggedIn(false);});
    }, []);
  return (
    <View style={styles.background}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>¡Hola!{'\n'}Bienvenido</Text>
      </ScrollView>

      <View style={styles.buttonPosition}>
        {!loggedIn && (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={async () => {
              await Signin(setloggedIn, setUserName);
            }}
            disabled={loggedIn}
          />
        )}
         {loggedIn && <PrimaryButton
        text={'Bienvenido '+userName}
        onPress={() => navigation.navigate(Screens.TabNavigator)}>
        </PrimaryButton>}
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
