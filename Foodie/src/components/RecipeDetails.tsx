import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';

// Ajusta la ruta de tus archivos PNG
const TiempoIcon = require('../../assets/img/Tiempo.png');
const PorcionesIcon = require('../../assets/img/Porciones.png');
const ShareIcon = require('../../assets/img/Share.png');
const StarIcon = require('../../assets/img/Star 1.png');

const fake_profile = {
  picture:
    'https://img.asmedia.epimg.net/resizer/YSEO6kkVnSsaaG3stkWsOkaizvY=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EE5Z5V4DD5MLHMGVBQNDWFAO4Y.jpg',
  fullName: 'Jerome Nigel McElroy',
  gmail: 'chef@google.com',
  appName: 'chefApp#1245 ',
};

const RecipeDetailsScreen = () => {
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
        <Text style={styles.authorName}>"Rating - TO DO"</Text>

        {/* Contenido adicional, si es necesario */}
      </View>
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
  },
  ratingSection: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 40,
      marginTop: 30,
      marginLeft: 15,
      marginRight: 15,
    },
  additionalSection: {
    // Agrega estilos adicionales si es necesario
  },
});

export default RecipeDetailsScreen;





