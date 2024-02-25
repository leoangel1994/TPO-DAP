import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';
import {userLogout} from '../api/ApiManager';
import {getUser} from '../api/ApiUser';
import {User} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [userData, setUserData] = useState<User>();
  const getUserData = async () => {
    getUser()
      .then(user => {
        const user_data: User = user;
        console.log(user_data);
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
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>Mi perfil</Text>
        <Image
          source={{
            uri:
              userData?.photo ??
              'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileText}>
          {(userData?.name ?? '') + ' ' + (userData?.familyName ?? '')}
        </Text>
        <Text style={styles.profileText}>{userData?.email ?? ''}</Text>
        <Text style={styles.profileText}>{userData?.userName ?? ''}</Text>
        <View style={{margin: 16}}></View>
        <Text style={styles.subTitleText}>Mis preferencias</Text>
        <View style={styles.tagsRow}>
          {(userData?.preferences?.length ?? 0) > 0 ? (
            userData?.preferences?.map((step, index) => (
              <Text key={index} style={styles.tag}>
                {userData?.preferences[index]}
              </Text>
            ))
          ) : (
            <Text style={styles.profileText}>No tenés preferencias</Text>
          )}
        </View>
        <View style={{marginTop: 32, marginBottom: 64}}>
          <PrimaryButton
            text="Mis Recetas"
            onPress={() =>
              navigation.navigate(Screens.MyRecipes)
            }></PrimaryButton>
          <PrimaryButton
            text="Editar Perfil"
            onPress={() =>
              navigation.navigate(Screens.EditProfile)
            }></PrimaryButton>
          <PrimaryButton
            text="Cerrar Sesión"
            backgroundColor={Theme.colors.DANGER}
            onPress={async () => {
              (await userLogout()) ? navigation.navigate(Screens.Login) : null;
            }}></PrimaryButton>
        </View>
      </ScrollView>
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
  subTitleText: CommonStyle.subTitleText,
  profileText: {
    ...CommonStyle.subTitleText,
    fontFamily: Theme.fontFamily.REGULAR,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.LIST_ITEM_TEXT,
    padding: 4,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: Theme.colors.SECONDARY_2,
    marginRight: 4,
  },
});

export default ProfileScreen;
