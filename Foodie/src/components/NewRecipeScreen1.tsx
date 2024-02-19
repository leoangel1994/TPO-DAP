import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import Swiper from 'react-native-swiper';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';
import { SmallButton } from './SmallButton';
import { Screens } from '../navigation/RootNavigator';
import { launchImageLibrary } from 'react-native-image-picker';
import ProgressBar from './ProgressBar';

export const NewRecipeScreen1 = ({ navigation }: { navigation: any }) => {
  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const openGallery = async () => {
    const result = await launchImageLibrary();
    if (images.length < 3) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const navigateToNextScreen = () => {
    setCurrentStep(currentStep + 1);
    navigation.navigate(Screens.NewRecipe2);
  };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Nueva Receta</Text>
          <Text style={styles.subTitleText}>Información principal sobre tu receta</Text>
          <TextInput style={styles.input} placeholder="Título" />
          <TextInput style={styles.input} placeholder="Descripción" />
          <TextInput style={styles.input} placeholder="Link a video" />

          <Swiper
            style={styles.swiperContainer}
            showsButtons={false}
            showsPagination={false}
            loadMinimalSize={2}
            loadMinimalLoaderColor="transparent"
          >
            {images.length === 0 ? (
              <View style={styles.slide}>
                <Text style={styles.noImageText}>No hay imágenes seleccionadas</Text>
              </View>
            ) : (
              images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{ uri: image }} style={styles.selectedImage} />
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Swiper>

          <SmallButton text="Seleccionar Imagen" onPress={openGallery} />
        </View>

      </ScrollView>

      {!isKeyboardOpen && (
        <ProgressBar totalSteps={4} currentStep={currentStep} />
      )}

      <View style={{ height: 25 }} />

      <PrimaryButton text="Siguiente" onPress={navigateToNextScreen} />
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
    height: 150,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
    padding: 10,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default NewRecipeScreen1;



