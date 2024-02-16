import React, { useState } from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';
import { SmallButton } from './SmallButton';
import { useLinkTo } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const NewRecipeScreen1 = ({ navigation }) => {
  const linkTo = useLinkTo();
  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera();
      setImages([...images, result.assets[0].uri]);
      // No avanzar al siguiente paso en NewRecipeScreen1
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary();
    if (images.length < 3) {
      setImages([...images, result.assets[0].uri]);
      // No avanzar al siguiente paso en NewRecipeScreen1
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const navigateToNextScreen = () => {
    // Avanzar al siguiente paso y navegar a NewRecipeScreen2
    setCurrentStep(currentStep + 1);
    navigation.navigate('NewRecipe2');
  };

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{ padding: 30, minWidth: '100%' }}>
          <Text style={styles.titleText}>Nueva Receta</Text>
          <Text style={styles.subTitleText}>
            Información principal sobre tu receta
          </Text>
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
                  <Image
                    source={{ uri: image }}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Swiper>

          <SmallButton
            text="Seleccionar Imagen"
            onPress={openGallery}
          />

        </View>
      </ScrollView>

      <PrimaryButton
        text="Siguiente"
        onPress={navigateToNextScreen}
      />
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, currentStep === 1 && styles.activeStep]}>
          <Text style={[styles.stepText, currentStep === 1 && styles.activeStepText]}>1</Text>
        </View>
        <View style={styles.progressLine}></View>
        <View style={styles.progressStep}>
          <Text style={styles.stepText}>2</Text>
        </View>
        <View style={styles.progressLine}></View>
        <View style={styles.progressStep}>
          <Text style={styles.stepText}>3</Text>
        </View>
        <View style={styles.progressLine}></View>
        <View style={styles.progressStep}>
          <Text style={styles.stepText}>4</Text>
        </View>
      </View>
      <View style={{ padding: 50 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    alignItems: 'flex-start',
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
    backgroundColor: 'rgba(255, 99, 71, 0.8)', // Rojo pastel con opacidad
    padding: 10,
    borderRadius: 50, // Hacer un círculo
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  progressStep: {
    backgroundColor: '#797979', // Color gris por defecto
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: 'transparent', // Set the background to transparent
  },
  activeStepText: {
    color: '#F37F21', // Color naranja para el paso activo
    fontSize: 16,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#797979', // Color gris por defecto
  },
  stepText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NewRecipeScreen1;






