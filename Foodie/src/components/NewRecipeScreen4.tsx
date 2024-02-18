import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';

const TagsDropdown = ({ availableTags, selectedTags, onTagSelect }) => {
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      onTagSelect([...selectedTags, tag]);
    } else {
      const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
      onTagSelect(updatedTags);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {availableTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.selectedTag,
              {
                backgroundColor: selectedTags.includes(tag) ? '#F8A82E' : '#FFFFFF',
              },
            ]}
            onPress={() => handleTagSelect(tag)}
          >
            <Text style={{ color: selectedTags.includes(tag) ? '#000000' : '#000000' }}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const NewRecipeScreen4 = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = [
    'Veganas',
    'Aptas Celiacos',
    'Rápida Preparación', //
    'Estimula el Sistema Inmune', //
    'Vegetarianas', // Corregido:
    'Promueve la Flora Intestinal', //
    'Baja en Sodio', //
    'Baja en Carbohidratos', //
    'Antiinflamatoria'
    ]

  const handleTagSelect = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{ padding: 30 }}>
          <Text style={styles.titleText}>Otros Datos</Text>
          <Text style={styles.subTitleText}>
            Agrega más información para que otros puedan encontrar tu receta fácilmente
          </Text>
          <TextInput style={styles.input} placeholder="Cantidad de calorías" />
          <TextInput style={styles.input} placeholder="Cantidad de proteínas" />
          <TextInput style={styles.input} placeholder="Cantidad de grasas totales" />

          <TagsDropdown
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </View>
      </ScrollView>
      <PrimaryButton
        text="Finalizar"
        onPress={() => navigation.navigate(Screens.Landing)}
      ></PrimaryButton>
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
  selectedTag: {
    borderRadius: 15,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1, // Asegúrate de que la opacidad sea 1 para evitar transparencia
  },
});

export default NewRecipeScreen4;


