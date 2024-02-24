import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {SmallButton} from './SmallButton';
import {Screens} from '../navigation/RootNavigator';
import {launchImageLibrary} from 'react-native-image-picker';
import ProgressBar from './ProgressBar';
import {useRoute} from '@react-navigation/native';
import {Recipe} from './FoodApiInterfaces/interfaces';

export interface RecipeEditImages {
  url: string;
  imageId?: string;
  _id?: string;
  isNew: boolean;
}

export const EditRecipeScreen1 = ({navigation}: {navigation: any}) => {
  const route: any = useRoute();
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);
  const [videoLinkText, setVideoLinkText] = useState('');
  const [images, setImages] = useState<RecipeEditImages[]>([]);
  const [imagesForDeletion, setImagesForDeletion] = useState<
    RecipeEditImages[]
  >([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (
        images.length < 3 &&
        result.assets &&
        result.assets.length > 0 &&
        result.assets[0].uri &&
        result.assets[0].uri.length > 0
      ) {
        setImages([...images, {url: result.assets[0].uri, isNew: true}]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = [...images];
    const delImage = updatedImages.splice(indexToRemove, 1);
    const deletedImages = [...imagesForDeletion, ...delImage];
    setImages(updatedImages);
    setImagesForDeletion(deletedImages);
  };

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.EditRecipe2, {
      recipe: route.params.recipe,
      imagesForDeletion: [...imagesForDeletion], // recipe-image relationship must be deleted
      step1: {
        title: titleText,
        description: descriptionText,
        videoLink: videoLinkText,
        images: [...images],
      },
    });
  };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const regexValidateUrl = (url: string) => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // validate fragment locator
    let regex = new RegExp(urlPattern, 'i');
    let match = regex.exec(url);
    return match ? match.length > 0 : false;
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    // initial values from recipe
    const recipe: Recipe = route.params.recipe;
    setTitleText(recipe.title);
    setDescriptionText(recipe.description);
    setIsValidLink(true);
    setVideoLinkText(recipe.youtubeLink);
    setImages(
      recipe.images.map(recipeImages => {
        return {...recipeImages, isNew: false};
      }),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [route.params?.recipe]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Editar Receta</Text>
          <Text style={styles.subTitleText}>
            Información principal sobre tu receta
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            defaultValue={titleText}
            onChangeText={newText => setTitleText(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            multiline={true}
            defaultValue={descriptionText}
            onChangeText={newText => setDescriptionText(newText)}
          />
          <TextInput
            style={[
              styles.input,
              !isValidLink &&
                !(videoLinkText.length == 0) && {
                  borderColor: Theme.colors.DANGER,
                },
            ]}
            placeholder="Link a video"
            defaultValue={videoLinkText}
            onChangeText={newText => {
              if (regexValidateUrl(newText)) {
                setVideoLinkText(newText);
                setIsValidLink(true);
              } else {
                setVideoLinkText(newText);
                setIsValidLink(false);
              }
            }}
          />
          <SmallButton text="Adjuntar Imágen" onPress={openGallery} />

          <Swiper
            style={styles.swiperContainer}
            showsButtons={true}
            showsPagination={true}
            key={images.length}
            activeDotColor={Theme.colors.SECONDARY_1}>
            {images.length === 0 ? (
              <View style={styles.slide}>
                <Text style={styles.noImageText}>No hay imágenes cargadas</Text>
              </View>
            ) : (
              images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image
                    source={{uri: image.url}}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Swiper>
        </View>
      </ScrollView>

      <View style={{height: 160}}>
        {!isKeyboardOpen && <ProgressBar currentStep={1} />}
        <View style={{height: 36}} />
        <PrimaryButton
          text="Siguiente"
          backgroundColor={
            titleText && descriptionText && isValidLink
              ? Theme.colors.SECONDARY_2
              : Theme.colors.NEUTRAL_3
          }
          onPress={() => {
            if (titleText && descriptionText && isValidLink)
              navigateToNextScreen();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: 30,
    minWidth: '100%',
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: CommonStyle.input,
  swiperContainer: {
    marginTop: 8,
    height: 140,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: Theme.colors.NEUTRAL_4,
    fontSize: 16,
  },
  selectedImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    left: '60%',
    top: '20%',
    backgroundColor: Theme.colors.DANGER,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default EditRecipeScreen1;
