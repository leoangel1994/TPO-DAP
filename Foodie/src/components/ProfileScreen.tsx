import {Image, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

const fake_profile = {
  picture:
    'https://img.asmedia.epimg.net/resizer/YSEO6kkVnSsaaG3stkWsOkaizvY=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EE5Z5V4DD5MLHMGVBQNDWFAO4Y.jpg',
  fullName: 'Jerome Nigel McElroy',
  gmail: 'chef@google.com',
  appName: 'chefApp#1245 ',
};

const ProfileScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Mi perfil</Text>
        <Image
          source={{uri: fake_profile.picture}}
          style={styles.profileImage}
        />
        <Text style={styles.subTitleText}>{fake_profile.fullName}</Text>
        <Text style={styles.subTitleText}>{fake_profile.gmail}</Text>
        <Text style={styles.subTitleText}>{fake_profile.appName}</Text>
      </View>
      <PrimaryButton
        text="Mis Recetas"
        onPress={() => navigation.navigate(Screens.MyRecipes)}></PrimaryButton>
      <PrimaryButton
        text="Editar Perfil"
        onPress={() =>
          navigation.navigate(Screens.EditProfile)
        }></PrimaryButton>
      <PrimaryButton
        text="Cerrar Sesión"
        onPress={() => navigation.navigate(Screens.Login)}></PrimaryButton>
      <PrimaryButton
        backgroundColor={Theme.colors.DANGER}
        text="Eliminar Cuenta"
        onPress={() =>
          navigation.navigate(Screens.EditProfile)
        }></PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,
  backgroundTabBar: {
    backgroundColor: Theme.colors.SECONDARY_2,
    width: '100%',
    height: 64,
  },
  titleText: CommonStyle.titleText,
  profileImage: {
    height: 152,
    width: 152,
    borderRadius: 76,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: 24,
  },
  subTitleText: {
    ...CommonStyle.subTitleText,
    fontFamily: Theme.fontFamily.REGULAR,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonPosition: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
});

export default ProfileScreen;
