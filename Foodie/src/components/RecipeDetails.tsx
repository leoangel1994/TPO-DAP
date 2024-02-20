import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';

// Ajusta la ruta de tus archivos PNG
const TiempoIcon = require('../../assets/img/Tiempo.png');
const PorcionesIcon = require('../../assets/img/Porciones.png');
const ShareIcon = require('../../assets/img/Share.png');
const Star1 = require('../../assets/img/Star 1.png');

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

      </View>

      {/* Sección 2 - Botones de Compartir y Favorito */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F8A82E' }]}>
          {/* Puedes agregar un icono aquí */}
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#797979' }]}>
          {/* Puedes agregar un icono aquí */}
          <Text style={[styles.buttonText, { color: 'white' }]}>Favorito</Text>
        </TouchableOpacity>
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
    justifyContent: 'start',
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  additionalSection: {
    // Agrega estilos adicionales si es necesario
  },
});

export default RecipeDetailsScreen;





