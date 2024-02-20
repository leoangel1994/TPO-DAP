import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';
import Swiper from 'react-native-swiper';

// Ajusta la ruta de tus archivos PNG
const TiempoIcon = require('../../assets/img/Tiempo.png');
const PorcionesIcon = require('../../assets/img/Porciones.png');
const ShareIcon = require('../../assets/img/Share.png');
const StarIcon = require('../../assets/img/Star 1.png');

const fake_profile = {
  picture: 'https://img.asmedia.epimg.net/resizer/YSEO6kkVnSsaaG3stkWsOkaizvY=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EE5Z5V4DD5MLHMGVBQNDWFAO4Y.jpg',
  fullName: 'Jerome Nigel McElroy',
  gmail: 'chef@google.com',
  appName: 'chefApp#1245 ',
};

const RecipeDetailsScreen = () => {
  const [activeMenu, setActiveMenu] = useState('Datos');
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Vegana', 'Apta Celiacos', 'Estimula el Sistema Inmune']); // Ejemplo con 3 tags
  const [recipeSteps, setRecipeSteps] = useState([
    'Paso 1: Preparar los ingredientes.',
    'Paso 2: Cocinar el arroz.',
    'Paso 3: Añadir el pollo y mezclar.',
    // Agrega más pasos según sea necesario
  ]);
  const [ingredients, setIngredients] = useState([
    { name: 'Arroz', quantity: '300g' },
    { name: 'Pollo', quantity: '200g' },
  ]);
  
  return (
    <ScrollView style={styles.background}>
      {/* Sección 1 - Titulo e Iconos */}
      <View style={styles.section}>
        <Text style={styles.titleText}>Arroz</Text>
        <Text style={styles.subTitleText}>Mi receta de Arroz con Pollo para compartir.</Text>

        {/* Contenedor para Porciones y Tiempo */}
        <View style={styles.infoContainer}>
          {/* Porciones */}
          <View style={styles.iconContainer}>
            <Image source={PorcionesIcon} style={styles.icon} />
            <Text style={styles.infoText}>4 porciones</Text>
          </View>

          {/* Tiempo */}
          <View style={styles.iconContainer}>
            <Image source={TiempoIcon} style={styles.icon} />
            <Text style={styles.infoText}>10 minutos</Text>
          </View>
        </View>

        {/* Sección 2 - Botones Compartir y Fav */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.roundButton}>
            <Image source={StarIcon} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Image source={ShareIcon} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselSection}>
        <Swiper
          style={styles.carouselContainer}
          showsButtons={true}
          showsPagination={true}
          activeDotColor="#F8A82E">
          {/* You can replace 'placeholder.jpg' with your actual image URLs */}
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }}
              style={styles.carouselImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }}
              style={styles.carouselImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }}
              style={styles.carouselImage}
            />
          </View>
        </Swiper>
      </View>

      {/* Sección 3 - Autor */}
      <View style={styles.authorSection}>
        <View style={styles.authorContainer}>
          <Image source={{ uri: fake_profile.picture }} style={styles.authorImage} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{fake_profile.fullName}</Text>
          </View>
        </View>
      </View>

      {/* Sección 4 - Rating */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingText}>Pronto vas a poder calificar Recetas!</Text>
      </View>

      {/* Sección 5 - Menú Horizontal */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={[
            styles.menuOption,
            { backgroundColor: activeMenu === 'Datos' ? '#F8A82E' : '#797979' },
          ]}
          onPress={() => setActiveMenu('Datos')}>
          <Text style={[styles.subTitleText, { color: activeMenu === 'Datos' ? 'white' : 'white' }]}>
            Datos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuOption,
            { backgroundColor: activeMenu === 'Pasos' ? '#F8A82E' : '#797979' },
          ]}
          onPress={() => setActiveMenu('Pasos')}>
          <Text style={[styles.subTitleText, { color: activeMenu === 'Pasos' ? 'white' : 'white' }]}>
            Pasos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuOption,
            { backgroundColor: activeMenu === 'Ingredientes' ? '#F8A82E' : '#797979' },
          ]}
          onPress={() => setActiveMenu('Ingredientes')}>
          <Text
            style={[styles.subTitleText, { color: activeMenu === 'Ingredientes' ? 'white' : 'white' }]}>
            Ingredientes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de 'Pasos' */}
      {activeMenu === 'Pasos' && (
        <View style={styles.stepsSection}>
          {recipeSteps.map((step, index) => (
            <View key={index} style={[styles.stepBox, { opacity: 0.8 }]}>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Contenido de 'Datos' */}
      {activeMenu === 'Datos' && (
        <View style={styles.dataSection}>
          <Text style={styles.dataValue}>{calories} Calorías</Text>
          <Text style={styles.dataValue}>{proteins}g Proteínas</Text>
          <Text style={styles.dataValue}>{totalFat}g Carbohidratos</Text>
          <View style={styles.tagsSection}>
            {selectedTags.map((tag, index) => (
              <TouchableOpacity key={index} style={[styles.tag, { backgroundColor: '#F8A82E' }]}>
                <Text style={{ color: 'black', fontFamily: Theme.fontFamily.REGULAR }}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Contenido de 'Ingredientes' */}
      {activeMenu === 'Ingredientes' && (
        <View style={styles.ingredientsSection}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>{ingredient.name}</Text>
              <Text style={styles.quantityText}>{ingredient.quantity}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2196F3',
  },
  section: {
    padding: 30,
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
  },
  ratingText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
  buttonSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  roundButton: {
    borderRadius: 50,
    backgroundColor: '#F8A82E',
    padding: 15,
    marginVertical: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  authorSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  authorInfo: {
    marginLeft: 15,
  },
  authorName: {
    fontSize: 18,
    fontFamily: Theme.fontFamily.REGULAR,
    color: 'black',
  },
  ratingSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  menuSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  menuOption: {
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    width: '30%',
  },
  dataSection: {
    padding: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  dataValue: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
    marginTop: 5,
  },
  tagsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F8A82E',
    borderRadius: 15,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
stepsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  stepBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    opacity: 0.8, // Editable opacity value (between 0 and 1)
  },
  stepText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
  carouselSection: {
    height: 200, // Adjust the height as needed
  },
  carouselContainer: {
    flex: 1,
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  ingredientsSection: {
      marginTop: 20,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 15,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
    },
    ingredientBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 15,
      marginVertical: 10,
      opacity: 0.8,
    },
    ingredientText: {
      fontSize: 16,
      color: 'black',
      fontFamily: Theme.fontFamily.REGULAR,
    },
    quantityText: {
      fontSize: 16,
      color: 'black',
      fontFamily: Theme.fontFamily.REGULAR,
    },
});

export default RecipeDetailsScreen;