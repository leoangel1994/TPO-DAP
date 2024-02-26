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

const TagsDropdown = ({availableTags, selectedTags, onTagSelect}: any) => {
  const handleTagSelect = (tag: any) => {
    if (!selectedTags.includes(tag)) {
      onTagSelect([...selectedTags, tag]);
    } else {
      const updatedTags = selectedTags.filter(
        (selectedTag: any) => selectedTag !== tag,
      );
      onTagSelect(updatedTags);
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 16}}>
        {availableTags.map((tag: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.selectedTag,
              {
                backgroundColor: selectedTags.includes(tag)
                  ? Theme.colors.SECONDARY_2
                  :Theme.colors.NEUTRAL_4,
              },
            ]}
            onPress={() => handleTagSelect(tag)}>
            <Text
              style={{
                color: selectedTags.includes(tag) ? Theme.colors.NEUTRAL_1 : Theme.colors.NEUTRAL_1,
              }}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const EditProfileScreen = ({navigation}: {navigation: any}) => {
  const route: any = useRoute();
  const [userData, setUserData] = useState<User>();
  const [newImage, setNewImage] = useState<string>();
  const availableTags = [
    'Vegana',
    'Apta Celiacos',
    'Rápida Preparación',
    'Estimula el Sistema Inmune',
    'Vegetarianas',
    'Promueve la Flora Intestinal',
    'Baja en Sodio',
    'Baja en Carbohidratos',
    'Antiinflamatoria',
  ];

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
      navigation.navigate(Screens.ErrorScreen, {
        errorCode: '10',
        errorMessage: 'Error al cargar imagen',
        nextScreen: Screens.Profile,
      });
    }
  };

  const editarPerfil = async () => {
    //console.log({...userData})
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
              navigation.navigate(Screens.ErrorScreen, {
                errorCode: '11',
                errorMessage: 'Error al actualizar imagen del usuario',
                nextScreen: Screens.Profile,
              });
            });
        } else {
          navigation.navigate(Screens.Profile, {reload: true});
        }
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '10',
          errorMessage: 'Error al actualizar datos del usuario',
          nextScreen: Screens.Profile,
        });
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
          <Text>Cargando...</Text>
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
  input: CommonStyle.input,
  selectedTag: {
    borderRadius: 15,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
});

export default EditProfileScreen;
