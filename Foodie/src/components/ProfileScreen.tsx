import {Image, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';
import { userLogout } from '../api/ApiManager';
import { getUser } from '../api/ApiUser';
import { User } from './FoodApiInterfaces/interfaces';
import { useEffect, useState } from 'react';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [userData, setUserData] = useState<User>();
  const getUserData = async () => {
    getUser()
      .then(user => {
        const user_data: User = user;
        setUserData(user_data);
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '2',
          errorMessage: 'Error al obtener datos del usuario',
          nextScreen: Screens.Profile,
        });
      });
  };
  useEffect(() => {
    getUserData();
  }, []);  

  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Mi perfil</Text>
        <Image
          source={{uri: userData?.photo ?? 'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg'}}
          style={styles.profileImage}
        />
        <Text style={styles.subTitleText}>{(userData?.name ?? '') +' '+ (userData?.familyName ?? '')}</Text>
        <Text style={styles.subTitleText}>{userData?.email ?? ''}</Text>
        <Text style={styles.subTitleText}>{userData?.userName ?? ''}</Text>
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
        onPress={async () => {
          (await userLogout()) ? 
            navigation.navigate(Screens.Login)
            : null
            }
          }></PrimaryButton>
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
