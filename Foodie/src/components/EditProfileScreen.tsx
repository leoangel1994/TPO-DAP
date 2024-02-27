import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';
import {putUser} from '../api/ApiUser';
import {User} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-ico-material-design';
import {postProfileImages} from '../api/ApiFilesManager';
import {
  ERROR_PROFILE_IMAGE_OPEN_GALLERY,
  ERROR_PROFILE_IMAGE_POST,
  ERROR_PROFILE_USER_PUT,
  ErrorNavigate,
} from './Error/ErrorCodes';
import TagsDropdown from './TagsSelector';
import availableTags from './FoodApiInterfaces/filterTags';

const EditProfileScreen = ({navigation}: {navigation: any}) => {
  const route: any = useRoute();
  const [userData, setUserData] = useState<User>();
  const [newImage, setNewImage] = useState<string>();

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri &&
        result.assets[0].uri.length > 0
      ) {
        setNewImage(result.assets[0].uri);
      }
    } catch (err) {
      ErrorNavigate(navigation, ERROR_PROFILE_IMAGE_OPEN_GALLERY);
    }
  };

  const editarPerfil = async () => {
    putUser({...userData})
      .then(() => {
        console.log('UPDATE OK');
        if (newImage) {
          postProfileImages('unused?', [newImage])
            .then(() => {
              console.log('POST IMAGE OK');
              navigation.navigate(Screens.Profile, {reload: true});
            })
            .catch(() => {
              ErrorNavigate(navigation, ERROR_PROFILE_IMAGE_POST);
            });
        } else {
          navigation.navigate(Screens.Profile, {reload: true});
        }
      })
      .catch(() => {
        ErrorNavigate(navigation, ERROR_PROFILE_USER_PUT);
      });
  };

  useEffect(() => {
    setUserData(route.params.profileInfo);
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.titleText}>Editar perfil</Text>
        {userData ? (
          <>
            <View>
              <Image
                source={{
                  uri:
                    (newImage?.length ?? 0) > 0
                      ? newImage
                      : userData.photo ??
                        'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={{position: 'absolute', left: '65%', top: '75%'}}
                onPress={openGallery}>
                <Icon
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  name="create-new-pencil-button"
                  height={24}
                  width={24}
                  color={Theme.colors.NEUTRAL_4}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileText}>
              {(userData?.name ?? '') + ' ' + (userData?.familyName ?? '')}
            </Text>
            <TextInput
              style={styles.input}
              defaultValue={userData.email}
              onChangeText={newText => {
                setUserData({...userData, email: newText});
              }}
            />
            <TextInput
              style={styles.input}
              defaultValue={userData.userName}
              onChangeText={newText => {
                setUserData({...userData, userName: newText});
              }}
            />

            <View style={{margin: 16}}></View>
            <Text style={styles.subTitleText}>Mis preferencias</Text>
            <TagsDropdown
              availableTags={availableTags}
              selectedTags={userData.preferences}
              onTagSelect={(tags: any) => {
                setUserData({...userData, preferences: tags});
              }}
            />
          </>
        ) : (
          <Text
            style={{
              ...styles.subTitleText,
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingTop: '30%',
            }}>
            Cargando...
          </Text>
        )}
        <View style={{marginTop: 32, marginBottom: 64}}>
          <PrimaryButton
            text="Editar Perfil"
            onPress={editarPerfil}></PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,
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
  input: CommonStyle.input,
});

export default EditProfileScreen;
