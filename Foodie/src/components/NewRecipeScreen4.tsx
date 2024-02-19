import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import ProgressBar from './ProgressBar';
import {Screens} from '../navigation/RootNavigator';
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

export const NewRecipeScreen4 = ({navigation}: any) => {
  const route: any = useRoute();

  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = [
    'Veganas',
    'Aptas Celiacos',
    'Rápida Preparación',
    'Estimula el Sistema Inmune',
    'Vegetarianas',
    'Promueve la Flora Intestinal',
    'Baja en Sodio',
    'Baja en Carbohidratos',
    'Antiinflamatoria',
  ];

  const handleTagSelect = (tags: any) => {
    setSelectedTags(tags);
  };

  const submitFormNewRecipe = () => {
    console.log({
      step1: route.params.step1,
      step2: route.params.step2,
      step3: route.params.step3,
      step4: {
        calories: calories,
        proteins: proteins,
        totalFat: totalFat,
        tags: selectedTags,
      },
    });

    //TODO: axios POST new recipe...

    navigateToNextScreen();
  };

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.Landing);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Otros Datos</Text>
          <Text style={styles.subTitleText}>
            Agregá más información para que otros puedan encontrar tu receta
            fácilmente
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de calorías"
            keyboardType="numeric"
            onChangeText={newText => {
              newText.replace(/[^0-9]/, '');
              setCalories(Number.parseInt(newText));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad de proteínas"
            keyboardType="numeric"
            onChangeText={newText => {
              newText.replace(/[^0-9]/, '');
              setProteins(Number.parseInt(newText));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad de grasas totales"
            keyboardType="numeric"
            onChangeText={newText => {
              newText.replace(/[^0-9]/, '');
              setTotalFat(Number.parseInt(newText));
            }}
          />

          <TagsDropdown
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </View>
      </ScrollView>
      <View style={{height: 160}}>
        <ProgressBar currentStep={4} />
        <View style={{height: 36}} />
        <PrimaryButton
          text="Finalizar"
          backgroundColor={
            calories && proteins && totalFat
              ? Theme.colors.SECONDARY_2
              : Theme.colors.NEUTRAL_3
          }
          onPress={() => {
            if (calories && proteins && totalFat) submitFormNewRecipe();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    justifyContent: 'space-between', // Asegúrate de que el contenido se distribuya verticalmente
    alignItems: 'center',
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
  selectedTag: {
    borderRadius: 15,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
});

export default NewRecipeScreen4;
