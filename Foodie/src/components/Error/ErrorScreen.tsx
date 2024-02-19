import {StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../../Theme';
import {PrimaryButton} from '../PrimaryButton';
import {Screens} from '../../navigation/RootNavigator';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-ico-material-design';

export const ErrorScreen = ({navigation}: {navigation: any}) => {
  const route: any = useRoute();
  const [errorCode, setErrorCode] = useState('-1');
  const [errorMessage, setErrorMessage] = useState('');
  const [nextScreen, setNextScreen] = useState(Screens.Login);

  useEffect(() => {
    setErrorCode(route.params?.errorCode);
    setErrorMessage(route.params?.errorMessage);
    setNextScreen(route.params?.nextScreen);
  }, [route.params?.errorCode, route.params?.errorMessage, route.params?.nextScreen]);

  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Error {errorCode}</Text>
        <Icon
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          name="warning-sign"
          height={128}
          width={128}
          color={Theme.colors.WARNING}
        />
        <Text style={styles.subTitleText}>{errorMessage}</Text>
        <View style={{padding: '20%'}}></View>
        <PrimaryButton
          text="Aceptar"
          onPress={() => navigation.navigate(nextScreen)}></PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: {
    ...CommonStyle.mainContainer,
    backgroundColor: Theme.colors.OPACITY,
    height: '100%',
  },
  titleText: {...CommonStyle.titleText, marginBottom: 64},
  subTitleText: {...CommonStyle.subTitleText, textAlign: 'center', padding: 16},
});

export default ErrorScreen;
