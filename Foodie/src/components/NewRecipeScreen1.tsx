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

export const NewRecipeScreen1 = ({navigation}: {navigation: any}) => {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [videoLinkText, setVideoLinkText] = useState('');
  const [images, setImages] = useState<string[]>([]);
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
        setImages([...images, result.assets[0].uri]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.NewRecipe2, {
      step1: {
        title: '',
        description: '',
        videoLink: '',
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Nueva Receta</Text>
          <Text style={styles.subTitleText}>
            Información principal sobre tu receta
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            onChangeText={newText => setTitleText(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            onChangeText={newText => setDescriptionText(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="Link a video"
            onChangeText={newText => setVideoLinkText(newText)}
          />

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
                  <Image source={{uri: image}} style={styles.selectedImage} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Swiper>

          <SmallButton text="Adjuntar Imágen" onPress={openGallery} />
        </View>
      </ScrollView>

      <>
        {!isKeyboardOpen && <ProgressBar currentStep={1} />}
        <View style={{height: 30}} />
        <PrimaryButton
          text="Siguiente"
          backgroundColor={titleText && descriptionText ? Theme.colors.SECONDARY_2 : Theme.colors.NEUTRAL_3}
          onPress={() => {
            if (titleText && descriptionText) navigateToNextScreen();
          }}
        />
      </>
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
    height: 200,
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

export default NewRecipeScreen1;
