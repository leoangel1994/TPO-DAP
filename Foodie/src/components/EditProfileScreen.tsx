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
                  ? '#F8A82E'
                  : '#FFFFFF',
              },
            ]}
            onPress={() => handleTagSelect(tag)}>
            <Text
              style={{
                color: selectedTags.includes(tag) ? '#000000' : '#000000',
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

  const editarPerfil = async () => {
    //console.log({...userData})
    putUser({...userData})
      .then(() => {
        console.log("UPDATE OK")
        navigation.navigate(Screens.Profile, {reload: true});
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
            <Image
              source={{
                uri:
                  userData.photo ??
                  'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg',
              }}
              style={styles.profileImage}
            />
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
