import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';

// Ajusta la ruta de tus archivos PNG
const TiempoIcon = require('../../assets/img/Tiempo.png');
const PorcionesIcon = require('../../assets/img/Porciones.png');
const ShareIcon = require('../../assets/img/Share.png');
const StarIcon = require('../../assets/img/Star 1.png');

const RecipeDetailsScreen = () => {
  return (
    <ScrollView style={styles.background}>
      {/* Sección 1 */}
      <View style={styles.section}>
        <Text style={styles.titleText}>Arroz</Text>
        <Text style={styles.subTitleText}>Mi receta de Arroz con Pollo para compartir.</Text>

        {/* Contenedor para Porciones y Tiempo */}
        <View style={styles.infoContainer}>
          {/* Icono y texto para "Porciones" */}
          <View style={styles.iconContainer}>
            <Image source={PorcionesIcon} style={styles.icon} />
            <Text style={styles.infoText}>4 porciones</Text>
          </View>

          {/* Icono y texto para "Tiempo" */}
          <View style={styles.iconContainer}>
            <Image source={TiempoIcon} style={styles.icon} />
            <Text style={styles.infoText}>10 minutos</Text>
          </View>
        </View>

        {/* Sección 2 - Botones de Compartir y Favorito */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.roundButton}>
            <Image source={ShareIcon} style={styles.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Image source={StarIcon} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sección 3 - Contenido adicional si es necesario */}
      <View style={styles.additionalSection}>
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
    flexDirection: 'row', // Cambiado a 'column'
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  roundButton: {
    borderRadius: 50, // Hace que el botón sea redondo
    backgroundColor: '#F8A82E',
    padding: 15,
    marginVertical: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white', // Ajusta el color del icono según tus necesidades
  },
  additionalSection: {
    // Agrega estilos adicionales si es necesario
  },
});

export default RecipeDetailsScreen;




