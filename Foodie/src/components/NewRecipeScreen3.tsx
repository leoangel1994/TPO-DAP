import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';
import ProgressBar from './ProgressBar'; // Importa el componente ProgressBar
import { Screens } from '../navigation/RootNavigator';
import { useRoute } from '@react-navigation/native';

const NewRecipeScreen3 = ({ navigation }: { navigation: any }) => {
  const route: any = useRoute(); // For searches received from Landing Screen
  console.log(route.params)
  const [steps, setSteps] = useState<string[]>(['']);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const totalSteps = 4;

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  };

  const handleNext = () => {
    navigation.navigate(Screens.NewRecipe4);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Pasos</Text>
          <Text style={styles.subTitleText}>Contanos paso a paso como se hace</Text>

          {steps.map((step, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Paso ${index + 1}`}
              value={step}
              onChangeText={(text) => updateStep(index, text)}
            />
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addStep}>
            <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
          </TouchableOpacity>
        </View>

        {!isKeyboardOpen && <ProgressBar currentStep={3} />}

        <PrimaryButton text="Siguiente" onPress={() => navigation.navigate(Screens.NewRecipe4)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.PRIMARY_1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 30,
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: {
    ...CommonStyle.input,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: Theme.colors.SECONDARY_1,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default NewRecipeScreen3;
